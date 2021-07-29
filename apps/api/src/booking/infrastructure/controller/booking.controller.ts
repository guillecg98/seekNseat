import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Res, UseInterceptors } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BookingDTO, CreateBookingDTO, EditBookingDTO } from "@seekNseat/contracts";
import { Response } from 'express';
import { runInThisContext } from "node:vm";

import { CancelBookingCommand, GetBookingsQuery, RequestBookingCommand, UpdateBookingStateCommand } from "../../application";
import { BookingView } from "../read-model/schema/booking.schema";
import { BookingMapper } from "../repository";

@ApiTags('bookings')
@Controller('bookings')
@UseInterceptors(ClassSerializerInterceptor)
export class BookingController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
        private bookingMapper: BookingMapper,
    ) {}

    @Post()
    @ApiResponse({ status: 200, description: 'Booking requested'})
    async create(@Body() createBookingDTO: CreateBookingDTO): Promise<BookingDTO> {
        try {
            return await this.commandBus.execute(
                new RequestBookingCommand(
                    createBookingDTO.id,
                    createBookingDTO.userId,
                    createBookingDTO.businessId,
                    createBookingDTO.numberOfFoodies,
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
    @ApiResponse({ status: 200, description: 'List Bookings'})
    @ApiResponse({ status: 404, description: 'Bookings not found'})
    @ApiQuery({name: 'userId', required: false})
    @ApiQuery({name: 'businessId', required: false})
    async findAll(
        @Res({passthrough: true}) res: Response,
        @Query('userId') userId: string,
        @Query('businessId') businessId: string
    ): Promise<BookingDTO[]> {
        try {
            const bookings = await this.queryBus.execute<GetBookingsQuery, BookingView[]>(
                new GetBookingsQuery(userId, businessId)
            )

            res.setHeader('X-Total-Count', bookings.length)

            return bookings.map(this.bookingMapper.viewToDto);
        } catch(e) {
            if(e instanceof Error) {
                throw new BadRequestException(e.message);
            } else {
                throw new BadRequestException('Server Error')
            }
        }
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: 'Booking request responsed'})
    @ApiResponse({ status: 404, description: 'Booking not found'})
    async update(@Param('id') id: string, @Body() editBookingDTO: EditBookingDTO): Promise<BookingDTO> {
        try {
            return await this.commandBus.execute(
                new UpdateBookingStateCommand(
                    id,
                    editBookingDTO.bookingState,
                    editBookingDTO.noShow
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

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Booking deleted'})
    @ApiResponse({ status: 404, description: 'Booking not found'})
    async delete(@Param('id') id: string): Promise<BookingDTO> {
        try {
            return await this.commandBus.execute(
                new CancelBookingCommand(id)
            );
        } catch(e) {
            if(e instanceof Error) {
                throw new BadRequestException(e.message);
            } else {
                throw new BadRequestException('Server Error')
            }
        }
    }
}