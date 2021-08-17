import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TokenVerificationDTO } from '@seekNseat/contracts/google-auth';
import { UserDto } from '@seekNseat/contracts/user';

import { GoogleAuthService } from './google-auth.service';

@ApiTags('google-auth')
@Controller('google-login')
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Post()
  async authentincate(
    @Body() tokenData: TokenVerificationDTO
  ): Promise<UserDto> {
    try {
      const user = await this.googleAuthService.authenticate(tokenData.token);
      console.debug(user);
      return user;
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }
}
