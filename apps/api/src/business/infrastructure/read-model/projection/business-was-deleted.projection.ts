import { Inject } from "@nestjs/common";
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Model } from "mongoose";

import { BusinessWasDeleted } from "../../../domain";
import { BUSINESS_MODEL,BusinessView } from "../schema/business.schema";

@ViewUpdaterHandler(BusinessWasDeleted)
export class BusinessWasDeletedProjection implements IViewUpdater<BusinessWasDeleted> {
    constructor(
        @Inject(BUSINESS_MODEL)
        private businessModel: Model<BusinessView>
    ) {}

    async handle(event: BusinessWasDeleted) {
        await this.businessModel.deleteOne(
            {_id: event.id},
        ).exec();
    }
}