import { Document, Schema } from "mongoose";

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
})

export interface BusinessView extends Document {
    readonly _id: string;
    readonly name: string;
    readonly contactPhone: string;
    readonly address: string;
    readonly description: string;
    readonly deleted: Date;
    readonly blocked: boolean;
    //readonly images: String [];
    //readonly categories: CategoriesDTO[];
}

export const BUSINESS_MODEL = 'BUSINESS_MODEL';