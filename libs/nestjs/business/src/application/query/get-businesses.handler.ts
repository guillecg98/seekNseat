import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BusinessDTO } from '@seekNseat/contracts/business';

import { BUSINESS_FINDER, IBusinessFinder } from '../services';
import { GetBusinessesQuery } from './get-businesses.query';

@QueryHandler(GetBusinessesQuery)
export class GetBusinessesHandler implements IQueryHandler<GetBusinessesQuery> {
  constructor(
    @Inject(BUSINESS_FINDER)
    private readonly finder: IBusinessFinder
  ) {}

  async execute(query: GetBusinessesQuery): Promise<BusinessDTO[]> {
    if (query.category) {
      return this.finder.findAllByCategory(query.category);
    }
    return this.finder.findAll();
  }
}
