import { ICommand } from '@nestjs/cqrs';

export class EditBusinessCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly contactPhone: string,
    public readonly address: string,
    public readonly description: string,
    public readonly categories: string[]
  ) {}
}
