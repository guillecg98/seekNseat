import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import {
  BusinessProfileWasEdited,
  BusinessWasCreated,
  BusinessWasDeleted,
} from '../event';
import { BusinessContactPhone } from './business-contact-phone';
import { BusinessId } from './business-id';
import { BusinessName } from './business-name';

export class Business extends AggregateRoot {
  private _id: BusinessId;
  private _name: BusinessName;
  private _contactPhone: BusinessContactPhone;
  private _address?: string;
  private _description?: string;
  private _blocked?: boolean;
  private _deleted?: Date;

  public static create(
    id: BusinessId,
    name: BusinessName,
    contactPhone: BusinessContactPhone
  ): Business {
    const business = new Business();
    business.apply(
      new BusinessWasCreated(id.value, name.value, contactPhone.value)
    );
    return business;
  }

  aggregateId(): string {
    return this.id.value;
  }

  get id(): BusinessId {
    return this._id;
  }

  get name(): BusinessName {
    return this._name;
  }

  get contactPhone(): BusinessContactPhone {
    return this._contactPhone;
  }

  get address(): string | undefined {
    return this._address;
  }

  get description(): string | undefined {
    return this._description;
  }

  private onBusinessWasCreated(event: BusinessWasCreated) {
    this._id = BusinessId.fromString(event.id);
    this._name = BusinessName.fromString(event.name);
    this._contactPhone = BusinessContactPhone.fromString(event.contactPhone);
    this._blocked = false;
    this._deleted = undefined;
  }

  editProfile(
    name: BusinessName,
    contactPhone: BusinessContactPhone,
    address: string,
    description: string
  ) {
    this.apply(
      new BusinessProfileWasEdited(
        this.id.value,
        name.value,
        contactPhone.value,
        address,
        description
      )
    );
  }

  private onBusinessProfileWasEdited(event: BusinessProfileWasEdited) {
    this._name = BusinessName.fromString(event.name);
    this._contactPhone = BusinessContactPhone.fromString(event.contactPhone);
    this._address = event.address;
    this._description = event.description;
  }

  delete(): void {
    if (this._deleted) {
      return;
    }

    this.apply(new BusinessWasDeleted(this.id.value));
  }

  private onBusinessWasDeleted(event: BusinessWasDeleted) {
    this._deleted = new Date(event.metadata._ocurred_on);
  }
  //TODO
  //Block Business
}
