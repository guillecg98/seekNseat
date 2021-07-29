import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@seekNseat/nestjs/common';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  _id: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  roles: Role[];
}
