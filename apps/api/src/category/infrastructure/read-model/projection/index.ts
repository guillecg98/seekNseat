import { CategoryNameWasUpdatedProjection } from "./category-name-was-updated.projection";
import { CategoryWasCreatedProjection } from "./category-was-created.projection";
import { CategoryWasDeletedProjection } from "./category-was-deleted.projection";

export const ProjectionHandlers = [
    CategoryWasCreatedProjection,
    CategoryNameWasUpdatedProjection,
    CategoryWasDeletedProjection,
];