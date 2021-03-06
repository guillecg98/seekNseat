import { BusinessDTO } from '@seekNseat/contracts/business'
import { Document, Schema } from "mongoose";

export const BUSINESSES_PROJECTION = 'businesses'

export type BusinessDocument = BusinessDTO & Document;

export const BusinessSchema = new Schema({
    _id: String,
    ownerId: String,
    name: String,
    contactPhone: String,
    address: String,
    description: String,
    blocked: Boolean,
    deleted: Date,
    categories: [String],
    //images: [String],
    },
    {
        versionKey: false,
    }
)

