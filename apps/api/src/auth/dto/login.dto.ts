import { ApiProperty } from '@nestjs/swagger';
import { CredentialsInterface } from '@seekNseat/contracts';

export class LoginDTO implements CredentialsInterface {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
