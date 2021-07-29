import { BusinessDTO } from '@seekNseat/contracts/business'

import { BusinessId } from "../../domain";


export const BUSINESS_FINDER = 'BUSINESS_FINDER'

export interface IBusinessFinder {
    findAll(): Promise<BusinessDTO[]>
    find(id:BusinessId): Promise<BusinessDTO>
}