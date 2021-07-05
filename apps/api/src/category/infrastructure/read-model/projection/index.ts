import { CategoryWasCreatedProjection } from "./category-was-created.projection";
import { CategoryWasDeletedProjection } from "./category-was-deleted.projection";
import { CategoryWasRenamedProjection } from "./category-was-renamed.projection";

export const ProjectionHandlers = [
    CategoryWasCreatedProjection,
    CategoryWasDeletedProjection,
    CategoryWasRenamedProjection,
];