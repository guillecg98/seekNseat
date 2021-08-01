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
    // TODO
    //images
    //categories
}