import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CATEGORIES,Categories, CategoryId, CategoryIdNotFoundError } from "../../domain";
import { DeleteCategoryCommand } from "./delete-category.command";

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements ICommandHandler<DeleteCategoryCommand> {
    constructor(
        @Inject(CATEGORIES) private categories: Categories
    ) {}

    async execute(command: DeleteCategoryCommand) {
        const categoryId = CategoryId.fromString(command.categoryId);

        const category = await this.categories.find(categoryId);
        if(!category) {
            throw CategoryIdNotFoundError.with(categoryId);
        }

        category.delete();
        this.categories.save(category); 
    }
}