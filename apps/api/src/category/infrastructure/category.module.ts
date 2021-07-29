import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { EventSourcingModule } from "event-sourcing-nestjs";

import { DatabaseModule } from "../../database/database.module";
import { CreateCategoryHandler, DeleteCategoryHandler, RenameCategoryHandler } from "../application";
import { GetCategoriesHandler } from "../application/query/get-categories.handler";
import { GetCategoryHanlder } from "../application/query/get-category.handler";
import { CategoryProviders } from "./category.providers";
import { CategoryController } from "./controller/category.controller";
import { CategoryWasCreatedProjection } from "./read-model/projection/category-was-created.projection";
import { CategoryWasDeletedProjection } from "./read-model/projection/category-was-deleted.projection";
import { CategoryWasRenamedProjection } from "./read-model/projection/category-was-renamed.projection";
import { CategoryMapper } from "./repository/category.mapper";

const CommandHandlers = [
    CreateCategoryHandler,
    DeleteCategoryHandler,
    RenameCategoryHandler,
];
const QueryHandlers = [
    GetCategoryHanlder,
    GetCategoriesHandler,
];
const ProjectionHandlers = [
    CategoryWasCreatedProjection,
    CategoryWasDeletedProjection,
    CategoryWasRenamedProjection,
];

@Module({
    controllers: [CategoryController],
    imports: [CqrsModule, EventSourcingModule.forFeature(), DatabaseModule],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers,
        ...ProjectionHandlers,
        ...CategoryProviders,
        CategoryMapper,
    ]
})
export class CategoryModule {}
