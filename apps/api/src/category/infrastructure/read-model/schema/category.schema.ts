import { Document, Schema } from 'mongoose';

export const CategorySchema = new Schema({
    _id: String,
    name: String,
    deleted: Date,
})

export interface CategoryView extends Document {
    readonly _id: string;
    readonly name: string;
    readonly deleted: Date;
}

export const CATEGORY_MODEL = 'CATEGORY_MODEL';