import { GetBusinessHandler } from './get-business.handler';
import { GetBusinessesHandler } from './get-businesses.handler';

export * from './get-business.query';
export * from './get-businesses.query';

export const queryHandlers = [
    GetBusinessesHandler,
    GetBusinessHandler,
];