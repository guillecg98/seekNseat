import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { BusinessProfileWasEdited } from "../../../domain";
import { BusinessDocument, BUSINESSES_PROJECTION } from "./business.schema";

@EventsHandler(BusinessProfileWasEdited)
export class BusinessProfileWasEditedProjection implements IEventHandler<BusinessProfileWasEdited> {
    constructor(
        @InjectModel(BUSINESSES_PROJECTION)
        private readonly businesses: Model<BusinessDocument>
    ) {}

    async handle(event: BusinessProfileWasEdited) {
        await this.businesses
            .findByIdAndUpdate(event.aggregateId,{
                name: event.name,
                contactPhone: event.contactPhone,
                address: event.address,
                description: event.description
        }).exec()
    }
}