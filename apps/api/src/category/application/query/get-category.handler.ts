import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CategoryDTO } from "@seekNseat/contracts";

import { CATEGORIES, Categories, CategoryId } from "../../domain";
import { CategoryMapper } from "../../infrastructure/repository/category.mapper";
import { GetCategoryQuery } from "./get-category.query";

@QueryHandler(GetCategoryQuery)
export class GetCategoryHanlder implements IQueryHandler<GetCategoryQuery> {
    constructor(
        @Inject(CATEGORIES) private categories: Categories,
        private categoryMapper: CategoryMapper,
    ) {}

    async execute(query: GetCategoryQuery): Promise<CategoryDTO | null> {
        const id = CategoryId.fromString(query.id)
        const category = await this.categories.find(id);

        if (category) {
            const categoryDto = this.categoryMapper.aggregateToDTO(category);
            return categoryDto;
        }
        return null;
    }
}