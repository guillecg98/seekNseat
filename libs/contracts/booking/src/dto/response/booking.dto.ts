import { ApiProperty } from "@nestjs/swagger";

interface Props {
  _id: string;
  userId: string;
  username: string;
  businessId: string;
  businessName: string;
  numberOfFoodies: number;
  time: Date;
  bookingState: string;
}

export class BookingDTO {

  @ApiProperty()
  public readonly _id: string;

  @ApiProperty()
  public readonly userId: string;

  @ApiProperty()
  public readonly username: string;

  @ApiProperty()
  public readonly businessId: string;

  @ApiProperty()
  public readonly businessName: string;

  @ApiProperty()
  public readonly numberOfFoodies: number;

  @ApiProperty()
  public readonly time: Date;

  @ApiProperty()
  public readonly bookingState: string;

  constructor(props: Partial<Props>) {
    Object.assign(this, props)
  }
}
