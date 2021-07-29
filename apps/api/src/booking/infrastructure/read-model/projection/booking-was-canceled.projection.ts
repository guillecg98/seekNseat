import { Inject } from "@nestjs/common";
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Model } from "mongoose";

import { BookingWasCanceled } from "../../../domain";
import { BOOKING_MODEL,BookingView } from "../schema/booking.schema";

@ViewUpdaterHandler(BookingWasCanceled)
export class BookingWasCanceledProjection implements IViewUpdater<BookingWasCanceled> {
    constructor(
        @Inject(BOOKING_MODEL)
        private bookingModel: Model<BookingView>
    ) {}

    async handle(event: BookingWasCanceled) {
        await this.bookingModel.deleteOne(
            {_id: event.id},
        ).exec();
    }
}