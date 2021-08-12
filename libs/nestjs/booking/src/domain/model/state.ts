import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { States } from '@seekNseat/contracts';

interface Props {
  value: States;
}

export class State extends ValueObject<Props> {
  public static fromString(bookingState: States): State {
    switch (bookingState) {
      case 'PENDING':
        return new State({ value: bookingState });
        break;
      case 'ACCEPTED':
        return new State({ value: bookingState });
        break;
      case 'DECLINED':
        return new State({ value: bookingState });
        break;
      default:
        throw new Error('Invalid state');
    }
  }

  get value(): string {
    return this.props.value;
  }
}
