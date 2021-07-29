import { CreateUserHandler } from './create-user.handler';
import { DeleteUserHandler } from './delete-user.handler';
import { UpdateUserHandler } from './update-user.handler';

export * from './create-user.command';
export * from './delete-user.command';
export * from './update-user.command';

export const commandHandlers = [
  CreateUserHandler,
  DeleteUserHandler,
  UpdateUserHandler,
];
