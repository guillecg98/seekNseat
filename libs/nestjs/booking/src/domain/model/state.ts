import { ValueObject } from "@aulasoftwarelibre/nestjs-eventstore";

interface Props {
    value: string;
}

export class State extends ValueObject<Props> {
    public static fromString(bookingState: string): State {
        switch(bookingState) {
            case 'PENDING':
                return new State({value: bookingState})
                break
            case 'ACCEPTED':
                return new State({value: bookingState})
                break
            case 'DECLINED':
                return new State({value: bookingState})
                break
            default:
                throw new Error('Invalid state')
        }
    }

    get value(): string {
        return this.props.value;
    }
}