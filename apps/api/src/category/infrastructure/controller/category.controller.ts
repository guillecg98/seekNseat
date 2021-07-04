import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Res,
    UseInterceptors
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import {
    ApiBearerAuth,
    ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import {
    CategoryDTO,
    CreateCategoryDTO,
    EditCategoryDTO
} from '@seekNseat/contracts';
import { Response } from 'express';

import {
    CreateCategoryCommand,
    DeleteCategoryCommand,
    GetCategoriesQuery,
    GetCategoryQuery,
    UpdateCategoryCommand
} from "../../application";
import { CategoryIdNotFoundError } from "../../domain";
import { CategoryMapper } from "../repository/category.mapper";


@ApiBearerAuth()
@ApiTags('categories')
@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export class CategoryController {
    constructor(
        private queryBus: QueryBus,
        private commandBus: CommandBus,
        private categoryMapper: CategoryMapper,
    ) {}

    @Post()
    @ApiResponse({ status: 200, description: 'Category created' })
    async create(@Body() createCategoryDto: CreateCategoryDTO): Promise<CategoryDTO> {
        try {
            return await this.commandBus.execute(
                new CreateCategoryCommand(
                    createCategoryDto.id,
                    createCategoryDto.name
                )
            );
        } catch(e) {
            if(e instanceof Error) {
                throw new BadRequestException(e.message);
            } else {
                throw new BadRequestException('Server error');
            }
        }
    }

    @Get()
    @ApiResponse({ status: 200, description: 'List Categories' })
    async findAll(@Res({ passthrough: true }) res: Response) {
        try {
            const categories = await this.queryBus.execute<GetCategoriesQuery, CategoryDTO[]>(
                new GetCategoriesQuery()
            );

            res.setHeader('X-Total-Count', categories.length);

            return categories;
        } catch (e) {
            if ( e instanceof Error) {
                throw new BadRequestException(e.message);
            } else {
                throw new BadRequestException('Server error');
            }
        }
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Category found' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    async findOne(@Param('id') id: string): Promise<CategoryDTO> {
        try {
            const category = await this.queryBus.execute<GetCategoryQuery, CategoryDTO>(
                new GetCategoryQuery(id)
            );

            if(!category) throw new NotFoundException();

            return category;
        } catch (e) {
            if (e instanceof CategoryIdNotFoundError) {
                throw new NotFoundException('Category not found');
            } else if (e instanceof Error) {
                throw new BadRequestException(e.message);
            } else {
                throw new BadRequestException('Server error');
            }
        }
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: 'Category updated'})
    @ApiResponse({ status: 404, description: 'Category not found'})
    async update(@Param('id') id: string, @Body() editCategoryDTO: EditCategoryDTO): Promise<CategoryDTO> {
        try {
            const category = await this.queryBus.execute<GetCategoryQuery, CategoryDTO>(
                new GetCategoryQuery(id)
            );

            if (!category) throw new NotFoundException();

            return this.commandBus.execute(
                new UpdateCategoryCommand(
                    id,
                    editCategoryDTO.name
                )
            );
        } catch (e) {
            if (e instanceof CategoryIdNotFoundError) {
                throw new NotFoundException('Category not found');
            } else if (e instanceof Error) {
                throw new BadRequestException(e.message);
            } else {
                throw new BadRequestException('Server error');
            }
        }
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Category deleted'})
    @ApiResponse({ status: 404, description: 'Category not found'})
    async remove(@Param('id') id: string): Promise<CategoryDTO> {
        try {
            return this.commandBus.execute(
                new DeleteCategoryCommand(id)
            );
        } catch (e) {
            if (e instanceof CategoryIdNotFoundError) {
                throw new NotFoundException();
            } else if(e instanceof Error) {
                throw new BadRequestException(e.message);
            } else {
                throw new BadRequestException('Server error');
            }
        }
    }
}

