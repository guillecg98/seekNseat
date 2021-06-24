import { ValueObject } from '@seekNseat/domain';

interface Props {
    value: string;
}

export class CategoryName extends ValueObject<Props> {
    public static fromString(name: string): CategoryName {
        if(name.length === 0) {
            throw new Error('Category name cannot be empty');
        }

        if (!/^[a-zA-Z0-9ñÑ]+$/.test(name)) {
            throw new Error('Invalid category name characters');
        }

        if(/\s/.test(name)) {
            throw new Error('Category name cannot contain spaces');
        }

        return new CategoryName({ value: name });
    }

    get value(): string {
        return this.props.value;
    }
}