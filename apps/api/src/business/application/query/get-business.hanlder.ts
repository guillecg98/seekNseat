import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { BusinessDTO } from "@seekNseat/contracts";

import { BUSINESSES, Businesses, BusinessId } from "../../domain";
import { BusinessMapper } from "../../infrastructure/repository/business.mapper";
import { GetBusinessQuery } from "./get-business.query";

@QueryHandler(GetBusinessQuery)
export class GetBusinessHanlder implements IQueryHandler<GetBusinessQuery> {
    constructor(
        @Inject(BUSINESSES) private businesses: Businesses,
        private businessMapper: BusinessMapper,
    ) {}

    async execute(query: GetBusinessQuery): Promise<BusinessDTO | null> {
        const id = BusinessId.fromString(query.id);
        const business = await this.businesses.find(id);

        if(business) {
            const businessDTO = this.businessMapper.aggregateToDTO(business)
            return businessDTO;
        }

        return null;
    }
}