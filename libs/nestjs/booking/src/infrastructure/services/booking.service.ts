import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { BookingDTO, CreateBookingDTO, EditBookingDTO } from "@seekNseat/contracts/booking";

import { CancelBookingCommand, DeleteBookingCommand, GetBookingQuery, GetBookingsQuery, RequestBookingCommand, UpdateBookingStateCommand } from "../../application";

@Injectable()
export class BookingService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    async create(createBookingDTO: CreateBookingDTO): Promise<BookingDTO> {
      await this.commandBus.execute(
          new RequestBookingCommand(
              createBookingDTO._id,
              createBookingDTO.userId,
              createBookingDTO.businessId,
              createBookingDTO.numberOfFoodies,
              createBookingDTO.time,
          )
      );

      return new BookingDTO(createBookingDTO)
    }

    async findAll(userId: string, businessId: string): Promise<BookingDTO[]> {
            return this.queryBus.execute<GetBookingsQuery, BookingDTO[]>(
                new GetBookingsQuery(userId, businessId)
            )
    }

    async findOne(id: string): Promise<BookingDTO> {
      return this.queryBus.execute<GetBookingQuery, BookingDTO>(
        new GetBookingQuery(id)
      );
    }

    async update(id: string, editBookingDTO: EditBookingDTO): Promise<BookingDTO> {
      await this.commandBus.execute(
        new UpdateBookingStateCommand(
            id,
            editBookingDTO.bookingState,
            editBookingDTO.noShow
        )
      );

      return this.findOne(id);
    }

    async cancel(id: string, editBookingDTO: EditBookingDTO): Promise<BookingDTO> {
      await this.commandBus.execute(
        new CancelBookingCommand(
          id,
          editBookingDTO.bookingState
        )
      );

      return this.findOne(id);
    }

    async delete(id: string) {
      await this.commandBus.execute(new DeleteBookingCommand(id));
    }
}