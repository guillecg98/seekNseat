import { Inject } from "@nestjs/common";
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Model } from "mongoose";

import { CategoryNameWasUpdated } from "../../../domain";
import { CATEGORY_MODEL,CategoryView } from "../schema/category.schema";

@ViewUpdaterHandler(CategoryNameWasUpdated)
export class CategoryNameWasUpdatedProjection implements IViewUpdater<CategoryNameWasUpdated> {
    constructor(
        @Inject(CATEGORY_MODEL)
        private categoryModel: Model<CategoryView>
    ) {}

    async handle(event: CategoryNameWasUpdated) {
        await this.categoryModel.updateOne(
            {_id: event.id},
            { $set: {name: event.name} },
        ).exec();
    }
}