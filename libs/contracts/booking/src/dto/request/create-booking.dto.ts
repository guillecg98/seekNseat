import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateBookingDTO {
    @ApiProperty()
    @IsUUID(4)
    _id: string;

    @ApiProperty()
    @IsUUID(4)
    userId: string;

    @ApiProperty()
    @IsUUID(4)
    businessId: string;
    //bookingTime: DateTime; --- TODO
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    numberOfFoodies: number;
}