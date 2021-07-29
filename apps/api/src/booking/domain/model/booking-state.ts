import { ValueObject } from "@seekNseat/domain";

interface Props {
    value: string;
}

export class BookingState extends ValueObject<Props> {
    public static fromString(bookingState: string): BookingState {
        switch(bookingState) {
            case 'PENDING':
                return new BookingState({value: bookingState})
                break
            case 'ACCEPTED':
                return new BookingState({value: bookingState})
                break
            case 'DECLINED':
                return new BookingState({value: bookingState})
                break
            default:
                throw new Error('Invalid state')
        }
    }

    get value(): string {
        return this.props.value;
    }
}