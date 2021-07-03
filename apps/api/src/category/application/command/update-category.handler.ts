import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CATEGORIES, Categories, CategoryId, CategoryIdNotFoundError, CategoryName } from "../../domain";
import { UpdateCategoryCommand } from "./update-category.command";

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand> {
    constructor(
        @Inject(CATEGORIES) private categories: Categories
    ) {}

    async execute(command: UpdateCategoryCommand) {
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