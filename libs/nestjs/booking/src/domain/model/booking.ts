import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { States } from '@seekNseat/contracts';
import { BusinessId } from "@seekNseat/nestjs/business";
import { UserId } from '@seekNseat/nestjs/user';

import {
  BookingStateWasUpdated,
  BookingWasCanceled,
  BookingWasRequested,
} from '../event';
import { BookingId } from './booking-id';
import { NumberOfFoodies } from './number-of-foodies';
import { State } from './state';

export class Booking extends AggregateRoot {
  private _id: BookingId;
  private _userId: UserId;
  private _businessId: BusinessId;
  //private _bookingTime: DateTime;
  private _numberOfFoodies: NumberOfFoodies;
  private _bookingState: State;
  private _noShow: boolean;
  private _deleted?: Date;

  public static create(
    id: BookingId,
    userId: UserId,
    businessId: BusinessId,
    //bookingTime: dateTime,
    numberOfFoodies: NumberOfFoodies
  ): Booking {
    const booking = new Booking();
    booking.apply(
      new BookingWasRequested(
        id.value,
        userId.value,
        businessId.value,
        numberOfFoodies.value
      )
    );

    return booking;
  }

  aggregateId(): string {
    return this.id.value;
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

  get numberOfFoodies(): NumberOfFoodies {
    return this._numberOfFoodies;
  }

  get bookingState(): State {
    return this._bookingState;
  }

  get noShow(): boolean {
    return this._noShow;
  }

  private onBookingWasRequested(event: BookingWasRequested) {
    this._id = BookingId.fromString(event.id);
    this._userId = UserId.fromString(event.userId);
    this._businessId = BusinessId.fromString(event.businessId);
    this._numberOfFoodies = NumberOfFoodies.fromNumber(event.numberOfFoodies);
    this._bookingState = State.fromString(States.Pending);
    this._noShow = false;
    this._deleted = undefined;
  }

  updateBookingState(bookingState: State, noShow: boolean) {
    this.apply(
      new BookingStateWasUpdated(this.id.value, bookingState.value, noShow)
    );
  }

  private onBookingStateWasUpdated(event: BookingStateWasUpdated) {
    this._bookingState = State.fromString(event.bookingState as States);
    this._noShow = event.noShow;
  }

  delete(): void {
    if (this._deleted) {
      return;
    }

    this.apply(new BookingWasCanceled(this.id.value));
  }

  private onBookingWasCanceled(event: BookingWasCanceled) {
    this._deleted = new Date(event.metadata._ocurred_on);
  }
}
