import { Resource, Role } from '@seekNseat/contracts/auth';
import { RolesBuilder } from 'nest-access-control';

export const acl: RolesBuilder = new RolesBuilder();

acl
  .grant(Role.User)
    .createOwn(Resource.Business)
    .readAny(Resource.Business)
    .createOwn(Resource.Booking)
    .readOwn(Resource.Booking)
    .updateOwn(Resource.Booking)
  .grant(Role.BusinessOwner)
    .updateOwn(Resource.Business)
    .deleteOwn(Resource.Business)
    .readOwn(Resource.Booking)
    .updateOwn(Resource.Booking)
    .deleteOwn(Resource.Booking)
  .grant(Role.Admin)
    .inherit(Role.User)
    .inherit(Role.BusinessOwner);
