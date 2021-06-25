import { Id } from '@seekNseat/domain';
import * as uuid from 'uuid';

export class CategoryId extends Id {
    static generate(): CategoryId {
        return new CategoryId(uuid.v4());
    }

    public static fromString(id: string): CategoryId {
        return new CategoryId(id);
    }
}