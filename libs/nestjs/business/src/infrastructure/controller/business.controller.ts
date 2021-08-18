import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Resource } from '@seekNseat/contracts';
import {
  BlockBusinessDTO,
  BusinessDTO,
  CreateBusinessDTO,
  EditBusinessDTO,
} from '@seekNseat/contracts/business';
import { Response } from 'express';
import { ACGuard, UseRoles } from 'nest-access-control';

import { BusinessGuard } from '../auth/business.guard';
import { BusinessService } from '../services';

@ApiBearerAuth()
@ApiTags('businesses')
@Controller('businesses')
@UseInterceptors(ClassSerializerInterceptor)
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  @ApiOperation({ summary: 'Create business' })
  @ApiResponse({ status: 200, description: 'Business created' })
  async create(
    @Body() createBusinessDTO: CreateBusinessDTO
  ): Promise<BusinessDTO> {
    try {
      return this.businessService.create(createBusinessDTO);
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server Error');
      }
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all businesses based on categories' })
  @ApiResponse({ status: 200, description: 'List Businesses' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiQuery({ name: 'category', required: false })
  @UseRoles({
    resource: Resource.Business,
    action: 'read',
    possession: 'any',
  })
  @UseGuards(BusinessGuard, ACGuard)
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query('category') category: string
  ): Promise<BusinessDTO[]> {
    try {
      const businesses = await this.businessService.findAll(category);
      const length = businesses.length;

      res.setHeader('X-Total-Count', length);
      return businesses;
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server Error');
      }
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one business by id' })
  @ApiResponse({ status: 200, description: 'Business found' })
  @ApiResponse({ status: 404, description: 'Business not found' })
  @UseRoles({
    resource: Resource.Business,
    action: 'read',
    possession: 'any',
  })
  @UseGuards(BusinessGuard, ACGuard)
  async findOne(@Param('id') id: string): Promise<BusinessDTO> {
    try {
      return this.businessService.findOne(id);
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update business profile' })
  @ApiResponse({ status: 200, description: 'Business profile modified' })
  @ApiResponse({ status: 400, description: 'Business profile not found' })
  @UseRoles({
    resource: Resource.Business,
    action: 'update',
    possession: 'own',
  })
  @UseGuards(BusinessGuard, ACGuard)
  async edit(
    @Param('id') id: string,
    @Body() editBusinessDTO: EditBusinessDTO
  ): Promise<BusinessDTO> {
    try {
      return await this.businessService.edit(id, editBusinessDTO);
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server Error');
      }
    }
  }

  @Put('/block/:id')
  @ApiOperation({ summary: 'Block business to avoid booking requests' })
  @ApiResponse({ status: 200, description: 'Business blocked' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @UseRoles({
    resource: Resource.Business,
    action: 'update',
    possession: 'own',
  })
  @UseGuards(BusinessGuard, ACGuard)
  async block(
    @Param('id') id: string,
    @Body() blockBusinessDTO: BlockBusinessDTO
  ): Promise<BusinessDTO> {
    try {
      return await this.businessService.block(id, blockBusinessDTO);
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server Error');
      }
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete business' })
  @ApiResponse({ status: 200, description: 'Business deleted' })
  @ApiResponse({ status: 404, description: 'Business not found' })
  @UseRoles({
    resource: Resource.Business,
    action: 'delete',
    possession: 'own',
  })
  @UseGuards(BusinessGuard, ACGuard)
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return this.businessService.delete(id);
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server Error');
      }
    }
  }
}
