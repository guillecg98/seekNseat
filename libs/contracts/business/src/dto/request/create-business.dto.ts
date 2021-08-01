import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBusinessDTO {
    @ApiProperty()
    @IsUUID(4)
    _id: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    contactPhone: string;
}