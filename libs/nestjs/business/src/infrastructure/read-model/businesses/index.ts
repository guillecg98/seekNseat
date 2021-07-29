import { BusinessProfileWasEditedProjection } from './business-profile-was-edited.projection'
import { BusinessWasCreatedProjection } from './business-was-created.projection'
import { BusinessWasDeletedProjection } from './business-was-deleted.projection'

export * from './business.schema'

export const businessProjections = [
    BusinessWasCreatedProjection,
    BusinessProfileWasEditedProjection,
    BusinessWasDeletedProjection,
];