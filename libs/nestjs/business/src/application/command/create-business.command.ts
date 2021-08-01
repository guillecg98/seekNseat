import { ICommand } from "@nestjs/cqrs";

export class CreateBusinessCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly contactPhone: string,
    ) {}
}