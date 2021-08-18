import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { UserId } from '@seekNseat/nestjs/user';

import {
  BusinessProfileWasEdited,
  BusinessWasBlocked,
  BusinessWasCreated,
  BusinessWasDeleted,
  CategoryWasAdded,
  CategoryWasRemoved,
} from '../event';
import { BusinessContactPhone } from './business-contact-phone';
import { BusinessId } from './business-id';
import { BusinessName } from './business-name';

export type CategoryWasUpdatedProps = { category: string };

export class Business extends AggregateRoot {
  private _id: BusinessId;
  private _ownerId: UserId;
  private _name: BusinessName;
  private _contactPhone: BusinessContactPhone;
  private _categories: string[];
  private _address?: string;
  private _description?: string;
  private _blocked?: boolean;
  private _deleted?: Date;

  public static create(
    id: BusinessId,
    ownerId: UserId,
    name: BusinessName,
    contactPhone: BusinessContactPhone
  ): Business {
    const business = new Business();
    business.apply(
      new BusinessWasCreated(
        id.value,
        ownerId.value,
        name.value,
        contactPhone.value
      )
    );
    return business;
  }

  aggregateId(): string {
    return this.id.value;
  }

  get id(): BusinessId {
    return this._id;
  }

  get ownerId(): UserId {
    return this._ownerId;
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

  get blocked(): boolean | undefined {
    return this._blocked;
  }

  get categorires(): string[] {
    return Array.from(this._categories);
  }

  hasCategory(category: string): boolean {
    return this.categorires.includes(category);
  }

  addCategory(category: string) {
    if (this.hasCategory(category)) {
      return;
    }

    this.apply(new CategoryWasAdded(this.id.value, category));
  }

  removeCategory(category: string) {
    if (!this.hasCategory(category)) {
      return;
    }

    this.apply(new CategoryWasRemoved(this.id.value, category));
  }

  private onBusinessWasCreated(event: BusinessWasCreated) {
    this._id = BusinessId.fromString(event.id);
    this._ownerId = UserId.fromString(event.ownerId);
    this._name = BusinessName.fromString(event.name);
    this._contactPhone = BusinessContactPhone.fromString(event.contactPhone);
    this._categories = [];
    this._address = '';
    this._description = '';
    this._blocked = false;
    this._deleted = undefined;
  }

  private onCategoryWasAdded(event: CategoryWasAdded) {
    this._categories.push(event.category);
  }

  private onCategoryWasRemoved(event: CategoryWasRemoved) {
    this._categories = this._categories.filter(
      (item: string) => item !== event.category
    );
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
        description,
      )
    );
  }

  private onBusinessProfileWasEdited(event: BusinessProfileWasEdited) {
    this._name = BusinessName.fromString(event.name);
    this._contactPhone = BusinessContactPhone.fromString(event.contactPhone);
    this._address = event.address;
    this._description = event.description;
  }

  blockBookingRequests(blocked: boolean) {
    this.apply(new BusinessWasBlocked(this.id.value, blocked));
  }

  private onBusinessWasBlocked(event: BusinessWasBlocked) {
    this._blocked = event.blocked;
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
