import { AggregateRoot } from "@nestjs/cqrs";

export class Business extends AggregateRoot {
    //private _id: BusinessId; TODO
    //private name: BusinessName; TODO
    //private contactPhone: BusinessContactPhone; TODO

    private constructor() {
        super();
    }

    public static add(
        //TODO
    ): Business | null {
        //TODO
        return null;
    }
}