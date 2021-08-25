import { ApiProperty } from "@nestjs/swagger";

export class NoShowUserDto {
  @ApiProperty()
  noShow: boolean;
}