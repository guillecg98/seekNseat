import { Inject } from "@nestjs/common";
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Model } from "mongoose";

import { BookingWasRequested } from "../../../domain";
import { BOOKING_MODEL,BookingView } from "../schema/booking.schema";

@ViewUpdaterHandler(BookingWasRequested)
export class BookingWasRequestedProjection implements IViewUpdater<BookingWasRequested> {
    constructor(
        @Inject(BOOKING_MODEL)
        private readonly bookingModel: Model<BookingView>
    ) {}

    async handle(event: BookingWasRequested) {
        const bookingView = new this.bookingModel({
            _id: event.id,
            userId: event.userId,
            businessId: event.businessId,
            numberOfFoodies: event.numberOfFoodies,
            bookingState: 'PENDING',
            noShow: false,
        });

        await bookingView.save();
    }
}