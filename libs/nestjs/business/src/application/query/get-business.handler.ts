import { IdNotFoundError } from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { BusinessDTO } from "@seekNseat/contracts/business";

import { BusinessId } from "../../domain";
import { BUSINESS_FINDER,IBusinessFinder } from '../services';
import { GetBusinessQuery } from "./get-business.query";

@QueryHandler(GetBusinessQuery)
export class GetBusinessHandler implements IQueryHandler<GetBusinessQuery> {
    constructor(
        @Inject(BUSINESS_FINDER)
        private readonly finder: IBusinessFinder
    ) {}

    async execute(query: GetBusinessQuery): Promise<BusinessDTO | null> {
        const id = BusinessId.fromString(query.id);

        const business = await this.finder.find(id);

        if (!business) {
              throw IdNotFoundError.withId(id);
        }

        return business;
    }
}