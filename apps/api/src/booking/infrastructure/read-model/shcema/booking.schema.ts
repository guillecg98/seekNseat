import { Document, Schema } from "mongoose";

export const BookingSchema = new Schema({
    _id: String,
    userId: String,
    businessId: String,
    numberOfFoodies: Number,
    bookingState: String,
    deleted: Date,
})

export interface BookingView extends Document {
    readonly _id: string;
    readonly userId: string;
    readonly businessId: string;
    readonly numberOfFoodies: string;
    readonly bookingState: string;
    readonly deleted: Date;
}

export const BOOKING_MODEL = 'BOOKING_MODEL';