import { ValueObject } from "@seekNseat/domain";

interface Props {
    value: string;
}

export class BusinessContactPhone extends ValueObject<Props> {
    public static fromString(contactPhone: string): BusinessContactPhone {
        if(contactPhone.length === 0) {
            throw new Error('Contact phone cannot be empty');
        }

        if(contactPhone.length < 9) {
            throw new Error('Contact phone must be a 9 digit number');
        }

        if(!/^[0-9]*$/.test(contactPhone)) {
            throw new Error('Contact phone must contain only numbers');
        }

        return new BusinessContactPhone({value: contactPhone});
    }

    get value(): string {
        return this.props.value;
    }
}