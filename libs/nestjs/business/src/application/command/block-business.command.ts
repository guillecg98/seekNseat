import { ICommand } from "@nestjs/cqrs";

export class BlockBusinessCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly blocked: boolean,
  ) {}
}