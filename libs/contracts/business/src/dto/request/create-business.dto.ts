import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBusinessDTO {
    @ApiProperty()
    @IsUUID(4)
    _id: string;

    @ApiProperty()
    @IsUUID(4)
    ownerId: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    contactPhone: string;

    @ApiProperty()
    @IsNotEmpty()
    categories: string[];
}