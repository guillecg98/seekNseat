import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Model } from "mongoose";

import { CATEGORY_MODEL,CategoryView } from "../../infrastructure/read-model/schema/category.schema";
import { GetCategoriesQuery } from "./get-categories.query";


@QueryHandler(GetCategoriesQuery)
export class GetCategoriesHandler implements IQueryHandler<GetCategoriesQuery> {
    constructor(
        @Inject(CATEGORY_MODEL)
        private categoryModel: Model<CategoryView>

    ) {}

    async execute(query: GetCategoriesQuery): Promise<CategoryView[]> {
       // return categories.map(this.categoryMapper.aggregateToDTO);
       return await this.categoryModel.find().exec();
    }
}