import { Provider } from "@nestjs/common";
import { Connection } from "mongoose";

import { DATABASE_CONNECTION } from "../../database/database.provider";
import { BOOKINGS } from "../domain";
import { BOOKING_MODEL,BookingSchema } from "./read-model/shcema/booking.schema";
import { BookingRepository } from "./repository";

export const BookingProviders: Provider [] = [
    {
        provide: BOOKING_MODEL,
        useFactory: (connection: Connection) =>
        connection.model('Booking', BookingSchema),
        inject: [DATABASE_CONNECTION],
    },
    {
        provide: BOOKINGS,
        useClass: BookingRepository,
    }
]