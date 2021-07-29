import { Id } from "@seekNseat/domain";
import * as uuid from 'uuid';

export class BookingId extends Id {
    static generate(): BookingId {
        return new BookingId(uuid.v4());
    }

    public static fromString(id: string): BookingId {
        return new BookingId(id);
    }
}