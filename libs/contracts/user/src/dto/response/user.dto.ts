import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@seekNseat/nestjs/common';
import { Exclude } from 'class-transformer';

interface Props {
  _id: string;
  username: string;
  roles: Role[];
  password: string;
  noShow: boolean;
}

export class UserDto {
  @ApiProperty()
  public readonly _id: string;

  @ApiProperty()
  public readonly username: string;

  @ApiProperty()
  public readonly roles: Role[];

  @Exclude()
  public readonly password: string;

  @ApiProperty()
  public readonly noShow: boolean;

  constructor(props: Partial<Props>) {
    Object.assign(this, props);
  }
}
