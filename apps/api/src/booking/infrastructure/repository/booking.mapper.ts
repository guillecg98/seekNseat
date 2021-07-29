import { Injectable } from "@nestjs/common";
import { BookingDTO } from "@seekNseat/contracts";

import { Booking } from "../../domain";
import { BookingView } from "../read-model/schema/booking.schema";

@Injectable()
export class BookingMapper {
    aggregateToDto(booking: Booking): BookingDTO {
        return new BookingDTO(
            booking.id.value,
            booking.userId.value,
            booking.businessId.value,
            booking.numberOfFoodies.value,
            booking.bookingState.value,
            booking.noShow,
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