import { UserDto } from '@seekNseat/contracts/user';
import { Document, Schema } from 'mongoose';

export const USERS_PROJECTION = 'users';

export type UserDocument = UserDto & Document;

export const UserSchema = new Schema(
  {
    _id: String,
    username: { type: String, index: { unique: true } },
    roles: [String],
    password: String,
    noShow: Boolean,
  },
  {
    versionKey: false,
  }
);
