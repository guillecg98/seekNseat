import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CategoryDTO } from "@seekNseat/contracts";

import { CATEGORIES,Categories } from "../../domain";
import { CategoryMapper } from "../../infrastructure/repository/category.mapper";
import { GetCategoriesQuery } from "./get-categories.query";


@QueryHandler(GetCategoriesQuery)
export class GetCategoriesHandler implements IQueryHandler<GetCategoriesQuery> {
    constructor(
        @Inject(CATEGORIES) private categories: Categories,
        private categoryMapper: CategoryMapper
    ) {}

    async execute(query: GetCategoriesQuery): Promise<CategoryDTO[]> {
        const categories = await this.categories.findAll();
        return categories.map(this.categoryMapper.aggregateToDTO);
    }
}