import { IQuery } from "@nestjs/cqrs";

export class GetBookingsByBusinessQuery implements IQuery {
    constructor(public readonly businessId: string) {}
}