import { Inject } from "@nestjs/common";
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Model } from "mongoose";

import { BusinessProfileWasEdited } from "../../../domain";
import { BUSINESS_MODEL,BusinessView } from "../schema/business.schema";

@ViewUpdaterHandler(BusinessProfileWasEdited)
export class BusinessProfileWasEditedProjection implements IViewUpdater<BusinessProfileWasEdited> {
    constructor(
        @Inject(BUSINESS_MODEL)
        private readonly businessModel: Model<BusinessView>
    ) {}

    async handle(event: BusinessProfileWasEdited) {
        await this.businessModel.updateOne(
            {_id: event.id},
            { $set: {
                name: event.name,
                contactPhone: event.contactPhone,
                address: event.address,
                description: event.description
            }},
        ).exec();
    }
}