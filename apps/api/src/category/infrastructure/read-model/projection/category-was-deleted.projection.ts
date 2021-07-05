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
        await this.categoryModel.updateOne(
            { _id: event.id },
            { $set: { deleted: event.modifiedOn} },
        ).exec()
    }

}