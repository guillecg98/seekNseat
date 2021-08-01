import { ICommand } from "@nestjs/cqrs";

export class DeleteBusinessCommand implements ICommand {
    constructor(
        public readonly id: string,
    ) {}
}