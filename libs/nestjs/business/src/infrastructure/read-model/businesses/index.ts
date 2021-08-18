import { BusinessProfileWasEditedProjection } from './business-profile-was-edited.projection'
import { BusinessWasBlockedProjection } from './business-was-blocked.projection';
import { BusinessWasCreatedProjection } from './business-was-created.projection'
import { BusinessWasDeletedProjection } from './business-was-deleted.projection'
import { CategoryWasAddedProjection } from './category-was-added.projection';
import { CategoryWasRemovedProjection } from './category-was-removed.projection';

export * from './business.schema'

export const businessProjections = [
    BusinessWasBlockedProjection,
    BusinessWasCreatedProjection,
    BusinessProfileWasEditedProjection,
    BusinessWasDeletedProjection,
    CategoryWasAddedProjection,
    CategoryWasRemovedProjection,
];