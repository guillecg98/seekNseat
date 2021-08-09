import { ApiProperty } from "@nestjs/swagger";

export class BlockBusinessDTO {
  @ApiProperty()
  blocked: boolean;
}