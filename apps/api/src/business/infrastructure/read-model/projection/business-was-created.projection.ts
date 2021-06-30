import { Inject } from "@nestjs/common";
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Model } from "mongoose";

import { BusinessWasCreated } from "../../../domain/event";
import { BUSINESS_MODEL,BusinessView } from "../schema/business.schema";

@ViewUpdaterHandler(BusinessWasCreated)
export class BusinessWasCreatedProjection implements IViewUpdater<BusinessWasCreated> {
    constructor(
        @Inject(BUSINESS_MODEL)
        private readonly businessModel: Model<BusinessView>
    ) {}

    async handle(event: BusinessWasCreated) {
        const businessView = new this.businessModel({
            _id: event.id,
            name: event.name,
        });

        await businessView.save()
    }
}