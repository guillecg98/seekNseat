import { ApiProperty } from '@nestjs/swagger';

export class EditBusinessDTO {
    @ApiProperty()
    name: string;

    @ApiProperty()
    contactPhone: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    categories: string[];

    // TODO
    //images
}