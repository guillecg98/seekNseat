import { Injectable } from "@nestjs/common";
import { BookingDTO } from "@seekNseat/contracts";

import { Booking } from "../../domain";
import { BookingView } from "../read-model/shcema/booking.schema";

@Injectable()
export class BookingMapper {
    aggregateToDto(booking: Booking): BookingDTO {
        return new BookingDTO(
            booking.id.value,
            booking.userId.value,
            booking.businessId.value,
            booking.numberOfFoodies.value,
            booking.bookingState,
        );
    }

    viewToDto(bookingView: BookingView): BookingDTO {

        const { _id: id, ...data } = bookingView.toObject();
        return {
            id,
            ...data
        }
    }
}