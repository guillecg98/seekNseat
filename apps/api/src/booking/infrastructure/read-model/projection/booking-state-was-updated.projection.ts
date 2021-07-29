import { Inject } from "@nestjs/common";
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Model } from "mongoose";

import { BookingState, BookingStateWasUpdated } from "../../../domain";
import { BOOKING_MODEL,BookingView } from "../schema/booking.schema";

@ViewUpdaterHandler(BookingStateWasUpdated)
export class BookingStateWasUpdatedProjection implements IViewUpdater<BookingStateWasUpdated> {
    constructor(
        @Inject(BOOKING_MODEL)
        private readonly bookingModel: Model<BookingView>
    ) {}

    async handle(event: BookingStateWasUpdated) {
        await this.bookingModel.updateOne(
            {_id: event.id},
            { $set: {
                bookingState: event.bookingState,
                noShow: event.noShow
            }},
        ).exec()
    }
}