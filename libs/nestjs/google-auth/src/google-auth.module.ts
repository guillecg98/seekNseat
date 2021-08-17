import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';

@Module({
  imports: [
    CqrsModule,
  ],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService],
  exports: [GoogleAuthService],
})
export class GoogleAuthModule {}
