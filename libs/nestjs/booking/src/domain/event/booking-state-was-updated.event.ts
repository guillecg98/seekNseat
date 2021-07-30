import { Event } from "@aulasoftwarelibre/nestjs-eventstore";
import { EditBookingDTO } from "@seekNseat/contracts/booking";

export class BookingStateWasUpdated extends Event<EditBookingDTO> {

    constructor(
        public readonly id: string,
        public readonly bookingState: string,
        public readonly noShow: boolean
    ) {
        super(id, {bookingState, noShow});
    }
}