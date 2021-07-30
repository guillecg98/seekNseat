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
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BookingDTO,
  CreateBookingDTO,
  EditBookingDTO,
} from '@seekNseat/contracts/booking';
import { Response } from 'express';

import { BookingService } from '../services';

@ApiTags('bookings')
@Controller('bookings')
@UseInterceptors(ClassSerializerInterceptor)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Booking created' })
  async create(
    @Body() createBookingDTO: CreateBookingDTO
  ): Promise<BookingDTO> {
    try {
      return this.bookingService.create(createBookingDTO);
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List Bookings' })
  @ApiResponse({ status: 404, description: 'Bookings not found' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'businessId', required: false })
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query('userId') userId: string,
    @Query('businessId') businessId: string
  ): Promise<BookingDTO[]> {
    try {
      const bookings = await this.bookingService.findAll(userId, businessId);
      const length = bookings.length;

      res.setHeader('X-Total-Count', length);
      return bookings;
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server Error');
      }
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Booking found' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async findOne(@Param('id') id: string): Promise<BookingDTO> {
    try {
      return this.bookingService.findOne(id);
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Booking request responsed' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async update(
    @Param('id') id: string,
    @Body() editBookingDTO: EditBookingDTO
  ): Promise<BookingDTO> {
    try {
      return await this.bookingService.update(id, editBookingDTO);
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server Error');
      }
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Booking deleted' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return this.bookingService.delete(id);
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server Error');
      }
    }
  }
}
