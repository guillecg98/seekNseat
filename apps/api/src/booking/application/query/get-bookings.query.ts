import { IQuery } from "@nestjs/cqrs";

export class GetBookingsQuery implements IQuery {
    constructor(
        public readonly userId: string,
        public readonly businessId: string,
    ) {}
}