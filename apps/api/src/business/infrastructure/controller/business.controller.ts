import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, Post, Put, Res, UseInterceptors } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BusinessDTO, CreateBusinessDTO, EditBusinessDTO } from "@seekNseat/contracts";
import { Response } from 'express';

import { CreateBusinessCommand, EditBusinessCommand, GetBusinessesQuery, GetBusinessQuery } from "../../application";

@ApiBearerAuth()
@ApiTags('businesses')
@Controller('businesses')
@UseInterceptors(ClassSerializerInterceptor)
export class BusinessController {
    constructor(
        private queryBus: QueryBus,
        private commandBus: CommandBus,
    ) {}

    @Post()
    @ApiResponse({ status: 200, description: 'Business created'})
    async create(@Body() createBusinessDTO: CreateBusinessDTO): Promise<BusinessDTO> {
        try {
            return await this.commandBus.execute(
                new CreateBusinessCommand(
                    createBusinessDTO.id,
                    createBusinessDTO.name,
                    createBusinessDTO.contactPhone,
                )
            );
        } catch(e) {
            if(e instanceof Error) {
                throw new BadRequestException(e.message);
            } else {
                throw new BadRequestException('Server Error');
            }
        }
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Business found'})
    @ApiResponse({ status: 404, description: 'Business not found'})
    async findOne(@Param('id') id: string): Promise<BusinessDTO> {
        try{
            const business = await this.queryBus.execute<GetBusinessQuery, BusinessDTO>(
                new GetBusinessQuery(id)
            );

            if(!business) {
                throw new NotFoundException();
            }

            return business;
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message);
            } else {
                throw new BadRequestException('Server error');
            }
        }
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: 'Business profile modified'})
    @ApiResponse({ status: 400, description: 'Business profile not found'})
    async edit(@Param('id') id: string, @Body() editBusinessDTO: EditBusinessDTO): Promise<BusinessDTO> {
        try {
            return await this.commandBus.execute(
                new EditBusinessCommand(
                    id,
                    editBusinessDTO.name,
                    editBusinessDTO.contactPhone,
                    editBusinessDTO.address,
                    editBusinessDTO.description
                )
            );

        } catch (e) {
            if(e instanceof Error) {
                throw new BadRequestException(e.message);
            } else {
                throw new BadRequestException('Server Error');
            }
        }
    }

    @Get()
    @ApiResponse({ status: 200, description: 'List Businesses'})
    async findAll(@Res({passthrough: true}) res: Response) {
        try {
            const businesses = await this.queryBus.execute<GetBusinessesQuery, BusinessDTO[]>(
                new GetBusinessesQuery()
            );

            res.setHeader('X-Total-Count', businesses.length);

            return businesses;
        } catch (e) {
            if(e instanceof Error) {
                throw new BadRequestException(e.message);
            } else {
                throw new BadRequestException('Server Error');
            }
        }
    }
}