import { IQuery } from "@nestjs/cqrs";

export class GetBookingsByUserQuery implements IQuery {
    constructor(public readonly userId: string) {}
}