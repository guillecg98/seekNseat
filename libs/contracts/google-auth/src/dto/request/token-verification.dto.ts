import { ApiProperty } from "@nestjs/swagger";
import { IsString } from 'class-validator';

export class TokenVerificationDTO {
  @ApiProperty()
  @IsString()
  token: string;
}
