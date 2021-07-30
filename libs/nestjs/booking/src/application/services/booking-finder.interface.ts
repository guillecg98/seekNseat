import { BookingDTO } from "@seekNseat/contracts/booking";
import { BusinessId } from "@seekNseat/nestjs/business";
import { UserId } from "@seekNseat/nestjs/user";

import { BookingId } from "../../domain";


export const BOOKING_FINDER = 'BOOKING_FINDER'

export interface IBookingFinder {
  findAll(): Promise<BookingDTO[]>
  findAllByUser(userId: UserId): Promise<BookingDTO[]>
  findAllByBusiness(businessId: BusinessId): Promise<BookingDTO[]>
  find(id: BookingId): Promise<BookingDTO | null>
}