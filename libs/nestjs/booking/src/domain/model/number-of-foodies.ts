import { ValueObject } from "@aulasoftwarelibre/nestjs-eventstore";

interface Props {
    value: number;
}

export class NumberOfFoodies extends ValueObject<Props> {
    public static fromNumber(numberOfFoodies: number): NumberOfFoodies {

        if(numberOfFoodies < 0) {
            throw new Error('Number of foodies cannot be negative');
        }

        if(numberOfFoodies === 0) {
            throw new Error('Number of foodies must be at least 1');
        }

        if(!Number.isInteger(numberOfFoodies)) {
            throw new Error('Must be integer number');
        }

        return new NumberOfFoodies({value: numberOfFoodies});
    }

    get value(): number {
        return this.props.value;
    }
}