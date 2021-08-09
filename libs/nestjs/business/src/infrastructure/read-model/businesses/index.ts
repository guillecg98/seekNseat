import { BusinessProfileWasEditedProjection } from './business-profile-was-edited.projection'
import { BusinessWasBlockedProjection } from './business-was-blocked.projection';
import { BusinessWasCreatedProjection } from './business-was-created.projection'
import { BusinessWasDeletedProjection } from './business-was-deleted.projection'

export * from './business.schema'

export const businessProjections = [
    BusinessWasBlockedProjection,
    BusinessWasCreatedProjection,
    BusinessProfileWasEditedProjection,
    BusinessWasDeletedProjection,
];