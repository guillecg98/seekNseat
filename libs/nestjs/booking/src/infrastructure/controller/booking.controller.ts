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
  BookingDTO,
  CreateBookingDTO,
  EditBookingDTO,
} from '@seekNseat/contracts/booking';
import { Response } from 'express';
import { ACGuard, UseRoles } from 'nest-access-control';

import { BookingBusinessGuard, BookingUserGuard } from '../auth';
import { BookingService } from '../services';

@ApiBearerAuth()
@ApiTags('bookings')
@Controller('bookings')
@UseInterceptors(ClassSerializerInterceptor)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: 'Request booking' })
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
  @ApiOperation({ summary: 'Read all bookings based on user id' })
  @ApiResponse({ status: 200, description: 'List Bookings' })
  @ApiResponse({ status: 404, description: 'Bookings not found' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'businessId', required: false })
  @UseRoles({
    resource: Resource.Booking,
    action: 'read',
    possession: 'own',
  })
  @UseGuards(BookingUserGuard, BookingBusinessGuard, ACGuard)
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
  @ApiOperation({ summary: 'Get one booking' })
  @ApiResponse({ status: 200, description: 'Booking found' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  @UseRoles({
    resource: Resource.Booking,
    action: 'read',
    possession: 'own',
  })
  @UseGuards(BookingUserGuard, BookingBusinessGuard, ACGuard)
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
  @ApiOperation({ summary: 'Update booking state' })
  @ApiResponse({ status: 200, description: 'Booking request responsed' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  @UseRoles({
    resource: Resource.Booking,
    action: 'update',
    possession: 'own',
  })
  @UseGuards(BookingUserGuard, BookingBusinessGuard, ACGuard)
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

  @Put('/cancel/:id')
  @ApiOperation({ summary: 'Cancel Booking' })
  @ApiResponse({ status: 200, description: 'Booking canceled by user' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  @UseRoles({
    resource: Resource.Booking,
    action: 'update',
    possession: 'own',
  })
  @UseGuards(BookingUserGuard, BookingBusinessGuard, ACGuard)
  async cancel(
    @Param('id') id: string,
    @Body() editBookingDTO: EditBookingDTO
  ): Promise<BookingDTO> {
    try {
      return await this.bookingService.cancel(id, editBookingDTO);
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server Error');
      }
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Booking' })
  @ApiResponse({ status: 200, description: 'Booking deleted' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  @UseRoles({
    resource: Resource.Booking,
    action: 'delete',
    possession: 'own',
  })
  @UseGuards(BookingUserGuard, BookingBusinessGuard, ACGuard)
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
