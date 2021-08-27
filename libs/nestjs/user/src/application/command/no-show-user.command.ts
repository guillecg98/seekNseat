import { ICommand } from '@nestjs/cqrs';

export class NoShowUserCommand implements ICommand {
  constructor(public readonly id: string, public readonly noShow: boolean) {}
}
