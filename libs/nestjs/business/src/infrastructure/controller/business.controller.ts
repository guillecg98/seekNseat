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
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BusinessDTO,
  CreateBusinessDTO,
  EditBusinessDTO,
} from '@seekNseat/contracts/business';
import { Response } from 'express';

import { BusinessService } from '../services';

@ApiTags('businesses')
@Controller('businesses')
@UseInterceptors(ClassSerializerInterceptor)
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  async create(createBusinessDTO: CreateBusinessDTO): Promise<BusinessDTO> {
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

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Business found' })
  @ApiResponse({ status: 404, description: 'Business not found' })
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
  @ApiResponse({ status: 200, description: 'Business profile modified' })
  @ApiResponse({ status: 400, description: 'Business profile not found' })
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

  @Get()
  @ApiResponse({ status: 200, description: 'List Businesses' })
  async findAll(
    @Res({ passthrough: true }) res: Response
  ): Promise<BusinessDTO[]> {
    try {
        const businesses = await this.businessService.findAll();
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

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Business deleted' })
  @ApiResponse({ status: 404, description: 'Business not found' })
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
