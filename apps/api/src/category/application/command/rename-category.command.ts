import { ICommand } from "@nestjs/cqrs";

export class RenameCategoryCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly name: string
    ) {}
}