import { IQuery } from "@nestjs/cqrs";

export class GetBusinessQuery implements IQuery {
    constructor(public readonly id: string) {}
}