import { Document, Schema } from 'mongoose';

export const CategorySchema = new Schema({
    _id: String,
    name: String,
})

export interface CategoryView extends Document {
    readonly _id: string;
    readonly name: string;
}

export const CATEGORY_MODEL = 'CATEGORY_MODEL';