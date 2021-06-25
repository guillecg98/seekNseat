import { ICommand } from '@nestjs/cqrs'

export class CreateCategoryCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly name: string,
    ) {}
}