import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayloadInterface } from '@seekNseat/contracts/auth';
import { UserDto } from '@seekNseat/contracts/user';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { GetUserByUsernameQuery } from '@seekNseat/nestjs/user';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private queryBus: QueryBus) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<UserDto> {
    const user = await this.queryBus.execute<GetUserByUsernameQuery, UserDto>(
      new GetUserByUsernameQuery(payload.username)
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
