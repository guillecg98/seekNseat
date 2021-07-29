import { ValueObject } from "@aulasoftwarelibre/nestjs-eventstore";

interface Props {
    value: string;
}

export class BusinessName extends ValueObject<Props> {
    public static fromString(name: string): BusinessName {
        if(name.length === 0) {
            throw new Error('Business name cannot be empty');
        }

        if (!/^[a-zA-Z0-9ñÑ ]+$/.test(name)) {
            throw new Error('Invalid business name characters');
        }

        return new BusinessName({value: name})
    }

    get value(): string {
        return this.props.value;
    }
}