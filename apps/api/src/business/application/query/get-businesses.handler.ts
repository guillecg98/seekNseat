import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Model } from "mongoose";

import { BUSINESS_MODEL,BusinessView } from "../../infrastructure/read-model/schema/business.schema";
import { GetBusinessesQuery } from "./get-businesses.query";

@QueryHandler(GetBusinessesQuery)
export class GetBusinessesHandler implements IQueryHandler<GetBusinessesQuery> {
    constructor(
        @Inject(BUSINESS_MODEL)
        private businessModel: Model<BusinessView>
    ) {}

    async execute(query: GetBusinessesQuery): Promise<BusinessView[]> {
        return this.businessModel.find().exec();
    }
}