import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class EditBookingDTO {
    @ApiProperty()
    bookingState: string;

    @ApiProperty()
    @IsBoolean()
    noShow?: boolean;
}