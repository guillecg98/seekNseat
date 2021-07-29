import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthService } from '@seekNseat/nestjs/auth';

import { IUserSecurity } from '../../application';

@Injectable()
export class UserSecurity implements IUserSecurity, OnModuleInit {
  private authService: AuthService;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.authService = this.moduleRef.get(AuthService, { strict: false });
  }

  async encodePassword(password: string): Promise<string> {
    return await this.authService.encodePassword(password);
  }
}
