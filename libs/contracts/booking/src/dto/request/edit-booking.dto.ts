import { ApiProperty } from "@nestjs/swagger";

export class EditBookingDTO {
    @ApiProperty()
    bookingState: string;
}