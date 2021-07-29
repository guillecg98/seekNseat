import {
  Body,
  Controller,
  Logger,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AccessTokenInterface, LoginDTO } from '@seekNseat/contracts/auth';

import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() loginDTO: LoginDTO): Promise<AccessTokenInterface> {
    const { username, password } = loginDTO;

    const isValid = await this.authService.validateUser(username, password);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return this.authService.generateAccessToken(username);
  }
}
