import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import {
    CATEGORIES,
    Categories,
    Category,
    CategoryId,
    CategoryIdAlreadyTakenError,
    CategoryName
} from "../../domain";
import { CreateCategoryCommand } from "./create-category.command";

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
    constructor(
        @Inject(CATEGORIES) private categories: Categories
    ) {}

    async execute(command: CreateCategoryCommand) {
        const id = CategoryId.fromString(command.id);
        const name = CategoryName.fromString(command.name);

        if(await this.categories.find(id)) {
            throw CategoryIdAlreadyTakenError.with(id);
        }

        const category = Category.add(id, name);
        this.categories.save(category);
    }
}