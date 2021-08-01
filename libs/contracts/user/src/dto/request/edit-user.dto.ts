import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@seekNseat/nestjs/common';

export class EditUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  roles: Role[];
}
