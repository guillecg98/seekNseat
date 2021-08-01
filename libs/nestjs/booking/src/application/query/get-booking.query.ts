import { IQuery } from "@nestjs/cqrs";

export class GetBookingQuery implements IQuery {
  constructor(
    public readonly id: string
  ) {}
}