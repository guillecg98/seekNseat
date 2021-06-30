import { Document, Schema } from "mongoose";

export const BusinessSchema = new Schema({
    _id: String,
    name: String,
    //contactPhone: Phone,
    //description: String,
    //images: String [],
    //categories: CategoriesDTO[],
})

export interface BusinessView extends Document {
    readonly _id: string;
    readonly name: string;
    //readonly contactPhone: Phone,
    //readonly description: String,
    //readonly images: String [],
    //readonly categories: CategoriesDTO[],
}

export const BUSINESS_MODEL = 'BUSINESS_MODEL';