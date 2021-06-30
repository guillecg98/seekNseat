import { AggregateRoot } from "@nestjs/cqrs";

import { BusinessWasCreated } from "../event/business-was-created.event";
import { BusinessId } from "./business-id";
import { BusinessName } from "./business-name";

export class Business extends AggregateRoot {
    private _id: BusinessId;
    private _name: BusinessName;
    private _blocked?: boolean;
    private _deleted?: Date;
    //private _contactPhone: BusinessContactPhone; TODO

    private constructor() {
        super();
    }

    public static add(
        id: BusinessId,
        name: BusinessName,
        //contactPhone: BusinessContactPhone,
    ): Business{
        const business = new Business();
        business.apply(
            new BusinessWasCreated(id.value, name.value)
        );
        return  business;
    }

    get id(): BusinessId {
        return this._id;
    }

    get name(): BusinessName {
        return this._name;
    }

    private onBusinessWasCreated(event: BusinessWasCreated) {
        this._id = BusinessId.fromString(event.id);
        this._name = BusinessName.fromString(event.name);
        this._blocked = false;
        this._deleted = undefined;
    }

    //TODO
    //Update & Add other fields (location, description, images[], categories[])
    //Delete Business
    //Block Business
}