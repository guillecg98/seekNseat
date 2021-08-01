import { ApiProperty } from '@nestjs/swagger';

interface Props {
    _id: string;
    name: string;
    contactPhone: string;
    address?: string;
    description?: string;

        //public readonly images: string[],
        //public readonly categories: CategoryDTO[],
}

export class BusinessDTO {

    @ApiProperty()
    public readonly _id: string;

    @ApiProperty()
    public readonly name: string;

    @ApiProperty()
    public readonly contactPhone: string;

    @ApiProperty()
    public readonly address?: string;

    @ApiProperty()
    public readonly description?: string;


    constructor(props: Partial<Props>) {
        Object.assign(this, props)
    }
}