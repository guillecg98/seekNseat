import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenInterface } from '@seekNseat/contracts/auth';
import { TokenVerificationDTO } from '@seekNseat/contracts/google-auth';

import { GoogleAuthService } from './google-auth.service';

@ApiTags('google-auth')
@Controller('google-login')
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Post()
  async authenticate(
    @Body() tokenData: TokenVerificationDTO
  ): Promise<AccessTokenInterface> {
    try {
      const user = await this.googleAuthService.authenticate(tokenData.token);

      return this.googleAuthService.generateAccessToken(user.username);

    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }
}
