import { ValueObject } from "@seekNseat/domain";

interface Props {
    value: number;
}

export class BookingNumberOfFoodies extends ValueObject<Props> {
    public static fromString(numberOfFoodies: number): BookingNumberOfFoodies {

        if(numberOfFoodies < 0) {
            throw new Error('Number of foodies cannot be negative');
        }

        if(numberOfFoodies === 0) {
            throw new Error('Number of foodies must be at least 1');
        }

        if(!Number.isInteger(numberOfFoodies)) {
            throw new Error('Must be integer number');
        }

        return new BookingNumberOfFoodies({value: numberOfFoodies});
    }

    get value(): number {
        return this.props.value;
    }
}