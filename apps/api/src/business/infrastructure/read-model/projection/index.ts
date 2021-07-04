import { BusinessProfileWasEditedProjection } from "./business-profile-was-edited.projection";
import { BusinessWasCreatedProjection } from "./business-was-created.projection";

export const ProjectionHandlers = [
    BusinessWasCreatedProjection,
    BusinessProfileWasEditedProjection,
];