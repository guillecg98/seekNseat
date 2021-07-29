import { BusinessDTO } from '@seekNseat/contracts/business'
import { Document, Schema } from "mongoose";

export const BUSINESSES_PROJECTION = 'businesess'

export type BusinessDocument = BusinessDTO & Document;

export const BusinessSchema = new Schema({
    _id: String,
    name: String,
    contactPhone: String,
    address: String,
    description: String,
    deleted: Date,
    blocked: Boolean,
    //images: String [],
    //categories: CategoriesDTO[],
    },
    {
        versionKey: false,
    }
)

