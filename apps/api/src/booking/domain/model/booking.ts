import { AggregateRoot } from "@nestjs/cqrs";
import { UserId } from "@seekNseat/nestjs/user";

import { BusinessId } from "../../../business/domain";
import { BookingStateWasUpdated, BookingWasCanceled, BookingWasRequested } from "../event";
import { BookingId } from "./booking-id";
import { BookingNumberOfFoodies } from "./booking-number-of-foodies";
import { BookingState } from "./booking-state";

export class Booking extends AggregateRoot {
    private _id: BookingId;
    private _userId: UserId;
    private _businessId: BusinessId;
    //private _bookingTime: DateTime;
    private _numberOfFoodies: BookingNumberOfFoodies;
    private _bookingState: BookingState;
    private _noShow: boolean;
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

    get noShow(): boolean {
        return this._noShow;
    }

    private onBookingWasRequested(event: BookingWasRequested) {
        this._id = BookingId.fromString(event.id);
        this._userId = UserId.fromString(event.userId);
        this._businessId = BusinessId.fromString(event.businessId);
        this._numberOfFoodies = BookingNumberOfFoodies.fromNumber(event.numberOfFoodies);
        this._bookingState = BookingState.fromString('PENDING');
        this._noShow = false;
        this._deleted = undefined;
    }

    updateBookingState(
        bookingState: BookingState,
        noShow: boolean
    ) {
       this.apply(
           new BookingStateWasUpdated(
               this.id.value,
               bookingState.value,
               noShow
           )
       );
    }

    private onBookingStateWasUpdated(event: BookingStateWasUpdated) {
        this._bookingState = BookingState.fromString(event.bookingState);
        this._noShow = event.noShow;
    }

    delete(): void {
        if(this._deleted) {
            return;
        }

        this.apply(new BookingWasCanceled(this.id.value))
    }

    private onBookingWasCanceled(event: BookingWasCanceled) {
        this._deleted = event.modifiedOn;
    }
}