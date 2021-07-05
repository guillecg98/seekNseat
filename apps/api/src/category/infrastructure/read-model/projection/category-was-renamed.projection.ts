import { Inject } from "@nestjs/common";
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Model } from "mongoose";

import { CategoryWasRenamed } from "../../../domain";
import { CATEGORY_MODEL,CategoryView } from "../schema/category.schema";

@ViewUpdaterHandler(CategoryWasRenamed)
export class CategoryWasRenamedProjection implements IViewUpdater<CategoryWasRenamed> {
    constructor(
        @Inject(CATEGORY_MODEL)
        private categoryModel: Model<CategoryView>
    ) {}

    async handle(event: CategoryWasRenamed) {
        await this.categoryModel.updateOne(
            {_id: event.id},
            { $set: {name: event.name} },
        ).exec();
    }
}