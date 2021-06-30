import { Business } from "../model";

export interface Businesses {
    save(business: Business): void;
}

export const BUSINESSES = 'BUSINESSES'