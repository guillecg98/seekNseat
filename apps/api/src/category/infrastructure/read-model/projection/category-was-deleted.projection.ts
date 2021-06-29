import { Inject } from "@nestjs/common";
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Model } from "mongoose";

import { CategoryWasDeleted } from "../../../domain";
import { CATEGORY_MODEL,CategoryView } from "../schema/category.schema";

@ViewUpdaterHandler(CategoryWasDeleted)
export class CategoryWasDeletedProjection implements IViewUpdater<CategoryWasDeleted> {
    constructor(
        @Inject(CATEGORY_MODEL)
        private categoryModel: Model<CategoryView>
    ) {}

    async handle(event: CategoryWasDeleted) {
        const categoryView = new this.categoryModel({
            _id: event.id,
        })

        await categoryView.save();
    }

}