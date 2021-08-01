import { ApiProperty } from '@nestjs/swagger';

import { CredentialsInterface } from '../../interfaces';

export class LoginDTO implements CredentialsInterface {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
