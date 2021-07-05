import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CATEGORIES, Categories, CategoryId, CategoryIdNotFoundError, CategoryName } from "../../domain";
import { RenameCategoryCommand } from "./rename-category.command";

@CommandHandler(RenameCategoryCommand)
export class RenameCategoryHandler implements ICommandHandler<RenameCategoryCommand> {
    constructor(
        @Inject(CATEGORIES) private categories: Categories
    ) {}

    async execute(command: RenameCategoryCommand) {
        const id = CategoryId.fromString(command.id);
        const name = CategoryName.fromString(command.name)
        const category = await this.categories.find(id);

        if(!category) {
            throw CategoryIdNotFoundError.with(id);
        }

        category.rename(name);
        this.categories.save(category);
    }
}