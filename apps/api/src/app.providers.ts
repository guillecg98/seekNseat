import { ClassSerializerInterceptor } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from '@seekNseat/nestjs/auth';

export const appProviders = [
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },
];
