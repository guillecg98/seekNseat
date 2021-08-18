import { IQuery } from '@nestjs/cqrs';

export class GetBusinessesQuery implements IQuery {
  constructor(public readonly category: string) {}
}
