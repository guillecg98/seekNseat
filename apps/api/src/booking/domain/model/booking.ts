import { AggregateRoot } from "@nestjs/cqrs";

import { BusinessId } from "../../../business/domain";
import { UserId } from "../../../user/domain";
import { BookingWasRequested } from "../event";
import { BookingId } from "./booking-id";
import { BookingNumberOfFoodies } from "./booking-number-of-foodies";

enum BookingState {
    "pending" = "pending",
    "accepted" = "accepted",
    "declined" = "declined",
}

export class Booking extends AggregateRoot {

    private _id: BookingId;
    private _userId: UserId;
    private _businessId: BusinessId;
    //private _bookingTime: DateTime;
    private _numberOfFoodies: BookingNumberOfFoodies;
    private _bookingState: BookingState;
    //private _noShow: boolean;
    private _deleted?: Date;

    private constructor() {
        super();
    }

    public static create(
        id: BookingId,
        userId: UserId,
        businessId: BusinessId,
        //bookingTime: dateTime,
        numberOfFoodies: BookingNumberOfFoodies,
        //noShow: boolean,
    ): Booking {
        const booking = new Booking();
        booking.apply(
            new BookingWasRequested(
                id.value,
                userId.value,
                businessId.value,
                numberOfFoodies.value,
            )
        );
        return booking;
    }

    get id(): BookingId {
        return this._id;
    }

    get userId(): UserId {
        return this._userId;
    }

    get businessId(): BusinessId {
        return this._businessId;
    }

    get numberOfFoodies(): BookingNumberOfFoodies {
        return this._numberOfFoodies;
    }

    get bookingState(): BookingState {
        return this._bookingState;
    }

    private onBookingWasRequested(event: BookingWasRequested) {
        this._id = BookingId.fromString(event.id);
        this._userId = UserId.fromString(event.userId);
        this._businessId = BusinessId.fromString(event.businessId);
        this._numberOfFoodies = BookingNumberOfFoodies.fromString(event.numberOfFoodies);
        this._bookingState = BookingState.pending;
        this._deleted = undefined;
    }
}