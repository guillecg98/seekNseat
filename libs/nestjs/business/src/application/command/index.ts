import { CreateBusinessHandler } from './create-business.handler';
import { DeleteBusinessHandler } from './delete-business.handler';
import { EditBusinessHandler } from './edit-business.handler';

export * from './create-business.command';
export * from './delete-business.command';
export * from './edit-business.command';

export const commandHandlers = [
    CreateBusinessHandler,
    DeleteBusinessHandler,
    EditBusinessHandler
];