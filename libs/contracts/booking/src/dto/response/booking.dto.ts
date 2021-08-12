import { ApiProperty } from "@nestjs/swagger";

interface Props {
  _id: string;
  userId: string;
  username: string;
  businessId: string;
  businessName: string;
  numberOfFoodies: number;
  bookingState: string;
  noShow?: boolean;
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

  //public readonly bookingTime: DateTime,
  @ApiProperty()
  public readonly numberOfFoodies: number;

  @ApiProperty()
  public readonly bookingState: string;

  @ApiProperty()
  public readonly noShow: boolean;

  constructor(props: Partial<Props>) {
    Object.assign(this, props)
  }
}
