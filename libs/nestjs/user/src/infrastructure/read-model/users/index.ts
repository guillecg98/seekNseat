import { UserPasswordWasUpdatedProjection } from './user-password-was-updated.projection';
import { UserRoleWasAddedProjection } from './user-role-was-added.projection';
import { UserRoleWasRemovedProjection } from './user-role-was-removed.projection';
import { UserWasCreatedProjection } from './user-was-created.projection';
import { UserWasDeletedProjection } from './user-was-deleted.projection';
import { UserWasMarkedAsNoShowProjection } from './user-was-marked-as-no-show.projection';

export * from './user.schema';

export const projectionHandlers = [
  UserPasswordWasUpdatedProjection,
  UserRoleWasAddedProjection,
  UserRoleWasRemovedProjection,
  UserWasCreatedProjection,
  UserWasDeletedProjection,
  UserWasMarkedAsNoShowProjection,
]