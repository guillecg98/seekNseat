import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Res, UseInterceptors } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BookingDTO, CreateBookingDTO } from "@seekNseat/contracts";
import { Response } from 'express';

import { GetBookingsByBusinessQuery, GetBookingsByUserQuery, GetBookingsQuery, RequestBookingCommand } from "../../application";
import { BookingView } from "../read-model/shcema/booking.schema";
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
    async findAll(@Res({passthrough: true}) res: Response): Promise<BookingDTO[]> {
        try {
            const bookings = await this.queryBus.execute<GetBookingsQuery, BookingView[]>(
                new GetBookingsQuery()
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

    @Get(':userId/bookings')
    @ApiOperation({summary: 'Get bookings of user'})
    @ApiResponse({ status: 200, description: 'List bookings of one user'})
    @ApiResponse({ status: 404, description: 'Bookings not found'})
    async findAllByUser(
        @Res({passthrough: true}) res: Response,
        @Param('userId') userId: string
        ): Promise<BookingDTO[]> {
        try {
            const bookings = await this.queryBus.execute<GetBookingsByUserQuery, BookingView[]>(
                new GetBookingsByUserQuery(userId)
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

    @Get(':businessId/bookings')
    @ApiOperation({summary: 'Get bookings of business'})
    @ApiResponse({ status: 200, description: 'List bookings of one business'})
    @ApiResponse({ status: 404, description: 'Bookings not found'})
    async findAllByBusiness(
        @Res({passthrough: true}) res: Response,
        @Param('businessId') businessId: string
        ): Promise<BookingDTO[]> {
        try {
            const bookings = await this.queryBus.execute<GetBookingsByBusinessQuery, BookingView[]>(
                new GetBookingsByBusinessQuery(businessId)
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
}