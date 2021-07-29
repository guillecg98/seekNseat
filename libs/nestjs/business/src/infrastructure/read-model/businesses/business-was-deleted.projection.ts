import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

import { BusinessWasDeleted } from "../../../domain";
import { BusinessDocument,BUSINESSES_PROJECTION } from "./business.schema";

@EventsHandler(BusinessWasDeleted)
export class BusinessWasDeletedProjection implements IEventHandler<BusinessWasDeleted> {
    constructor(
        @InjectModel(BUSINESSES_PROJECTION)
        private readonly businesses: Model<BusinessDocument>
    ) {}

    async handle(event: BusinessWasDeleted) {
        await this.businesses.findByIdAndDelete(event.aggregateId).exec();
    }
}