import { IQuery } from '@nestjs/cqrs';

export class GetCategoryQuery implements IQuery {
    constructor(public readonly id: string) {}
}