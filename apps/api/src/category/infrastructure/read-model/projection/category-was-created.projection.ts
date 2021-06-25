import { Inject } from "@nestjs/common";
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Model } from "mongoose";

import { CategoryWasCreated } from "../../../domain";
import { CATEGORY_MODEL,CategoryView } from "../schema/category.schema";

@ViewUpdaterHandler(CategoryWasCreated)
export class CategoryWasCreatedProjection implements IViewUpdater<CategoryWasCreated> {
    constructor(
        @Inject(CATEGORY_MODEL)
        private readonly categoryModel: Model<CategoryView>
    ) {}

    async handle(event: CategoryWasCreated) {
        const categoryView = new this.categoryModel({
            _id: event.id,
            name: event.name,
        });

        await categoryView.save();
    }
}