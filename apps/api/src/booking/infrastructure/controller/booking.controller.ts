import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Param, Post, UseInterceptors } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { BookingDTO, CreateBookingDTO } from "@seekNseat/contracts";

import { RequestBookingCommand } from "../../application";

@ApiTags('Bookings')
@Controller('Bookings')
@UseInterceptors(ClassSerializerInterceptor)
export class BookingController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
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
                    createBookingDTO.numberOfFoodies
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
}