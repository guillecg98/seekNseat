import { Resource, Role } from '@seekNseat/contracts';
import { RolesBuilder } from 'nest-access-control';

export const acl: RolesBuilder = new RolesBuilder();

acl
  .grant(Role.User)
    .readAny(Resource.Business)
    .createOwn(Resource.Booking)
    .readOwn(Resource.Booking)
  .grant(Role.BusinessOwner)
    .createOwn(Resource.Business)
    .updateOwn(Resource.Business)
    .deleteOwn(Resource.Business)
    .readOwn(Resource.Booking)
    .updateOwn(Resource.Booking)
    .deleteOwn(Resource.Booking)
  .grant(Role.Admin)
    .inherit(Role.User)
    .inherit(Role.BusinessOwner);
