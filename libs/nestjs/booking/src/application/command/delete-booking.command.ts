import { ICommand } from '@nestjs/cqrs';

export class DeleteBookingCommand implements ICommand {
  constructor(public readonly id: string) {}
}
