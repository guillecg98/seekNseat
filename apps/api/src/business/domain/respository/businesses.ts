import { Business, BusinessId } from "../model";

export interface Businesses {
    save(business: Business): void;
    find(businessId: BusinessId): Promise<Business | null>;
}

export const BUSINESSES = 'BUSINESSES'