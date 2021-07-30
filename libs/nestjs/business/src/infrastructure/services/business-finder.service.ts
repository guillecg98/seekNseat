import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BusinessDTO } from '@seekNseat/contracts/business';
import { Model } from 'mongoose';

import { IBusinessFinder } from '../../application';
import { BusinessId } from '../../domain';
import {
  BusinessDocument,
  BUSINESSES_PROJECTION,
} from '../read-model/businesses';

@Injectable()
export class BusinessFinder implements IBusinessFinder {
  constructor(
    @InjectModel(BUSINESSES_PROJECTION)
    private readonly businesses: Model<BusinessDocument>
  ) {}

  async findAll(): Promise<BusinessDTO[]> {
    const businesses = await this.businesses.find().lean();

    return businesses.map((business) => new BusinessDTO(business));
  }

  async find(id: BusinessId): Promise<BusinessDTO> {
    const business = await this.businesses.findById(id.value).lean();

    return new BusinessDTO(business);
  }
}
