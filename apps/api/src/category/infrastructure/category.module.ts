import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { EventSourcingModule } from "event-sourcing-nestjs";

import { AuthModule } from "../../auth/auth.module";
import { DatabaseModule } from "../../database/database.module";
import { CreateCategoryHandler, DeleteCategoryHandler, UpdateCategoryHandler } from "../application";
import { GetCategoriesHandler } from "../application/query/get-categories.handler";
import { GetCategoryHanlder } from "../application/query/get-category.handler";
import { CategoryProviders } from "./category.providers";
import { CategoryController } from "./controller/category.controller";
import { CategoryNameWasUpdatedProjection } from "./read-model/projection/category-name-was-updated.projection";
import { CategoryWasCreatedProjection } from "./read-model/projection/category-was-created.projection";
import { CategoryWasDeletedProjection } from "./read-model/projection/category-was-deleted.projection";
import { CategoryMapper } from "./repository/category.mapper";

const CommandHandlers = [
    CreateCategoryHandler,
    UpdateCategoryHandler,
    DeleteCategoryHandler,
];
const QueryHandlers = [
    GetCategoryHanlder,
    GetCategoriesHandler,
];
const ProjectionHandlers = [
    CategoryWasCreatedProjection,
    CategoryNameWasUpdatedProjection,
    CategoryWasDeletedProjection,
];

@Module({
    controllers: [CategoryController],
    imports: [AuthModule, CqrsModule, EventSourcingModule.forFeature(), DatabaseModule],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers,
        ...ProjectionHandlers,
        ...CategoryProviders,
        CategoryMapper,
    ]
})
export class CategoryModule {}