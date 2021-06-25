import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CATEGORIES, Categories, Category, CategoryId, CategoryIdNotFoundError, CategoryName } from "../../domain";
import { UpdateCategoryCommand } from "./update-category.command";

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand> {
    constructor(
        @Inject(CATEGORIES) private categories: Categories
    ) {}

    async execute(command: UpdateCategoryCommand) {
        const id = CategoryId.fromString(command.id);
        const category = await this.categories.find(id);

        if(!category) {
            throw CategoryIdNotFoundError.with(id);
        }

        this.updateCategoryName(category, command);
        this.categories.save(category);
    }

    private updateCategoryName(category: Category, command: UpdateCategoryCommand) {
        command.name && category.updateCategoryName(CategoryName.fromString(command.name));
    }
}