import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookingDTO } from '@seekNseat/contracts/booking';
import { BusinessId } from '@seekNseat/nestjs/business';
import { UserId } from '@seekNseat/nestjs/user';
import { Model } from 'mongoose';

import { IBookingFinder } from '../../application';
import { BookingId } from '../../domain';
import { BookingDocument, BOOKINGS_PROJECTION } from '../read-model';

@Injectable()
export class BookingFinder implements IBookingFinder {
  constructor(
    @InjectModel(BOOKINGS_PROJECTION)
    private readonly bookings: Model<BookingDocument>
  ) {}

  async findAll(): Promise<BookingDTO[]> {
    const bookings = await this.bookings.find().lean();
    return bookings.map((booking) => new BookingDTO(booking));
  }

  async findAllByUser(userId: UserId): Promise<BookingDTO[]> {
    const bookings = await this.bookings.find({ userId: userId.value }).lean();
    return bookings.map((booking) => new BookingDTO(booking));
  }

  async findAllByBusiness(businessId: BusinessId) {
    const bookings = await this.bookings
      .find({ businessId: businessId.value })
      .lean();
    return bookings.map((booking) => new BookingDTO(booking));
  }

  async find(id: BookingId): Promise<BookingDTO | null> {
    const booking = await this.bookings.findById(id.value).lean();
    return new BookingDTO(booking);
  }
}
