import { BusinessProfileWasEditedProjection } from "./business-profile-was-edited.projection";
import { BusinessWasCreatedProjection } from "./business-was-created.projection";
import { BusinessWasDeletedProjection } from "./business-was-deleted.projection";

export const ProjectionHandlers = [
    BusinessWasCreatedProjection,
    BusinessProfileWasEditedProjection,
    BusinessWasDeletedProjection,
];