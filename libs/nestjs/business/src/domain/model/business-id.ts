import { Id } from "@aulasoftwarelibre/nestjs-eventstore";
import * as uuid from 'uuid';

export class BusinessId extends Id {
    static generate(): BusinessId {
        return new BusinessId(uuid.v4());
    }

    public static fromString(id: string): BusinessId {
        return new BusinessId(id);
    }
}