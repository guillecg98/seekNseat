import { AggregateRoot } from '@nestjs/cqrs';

import { CategoryNameWasUpdated, CategoryWasCreated, CategoryWasDeleted } from '../event';
import { CategoryId } from './category-id';
import { CategoryName } from './category-name';

export class Category extends AggregateRoot {
    private _id: CategoryId;
    private _name: CategoryName;
    private _deleted?: Date;

    private constructor() {
        super();
    }

    get id(): CategoryId {
        return this._id;
    }

    get name(): CategoryName {
        return this._name;
    }

    public static add(id: CategoryId, name: CategoryName): Category {
        const category = new Category();
        category.apply(
            new CategoryWasCreated(id.value, name.value)
        );
        return category;
    }

    private onCategoryWasCreated(event: CategoryWasCreated) {
        this._id = CategoryId.fromString(event.id);
        this._name = CategoryName.fromString(event.name);
        this._deleted = undefined;
    }

    delete(): void {
        if(this._deleted) {
            return;
        }
        this.apply(new CategoryWasDeleted(this.id.value))
    }

    private onCategoryWasDeleted(event: CategoryWasDeleted) {
        this._deleted = event.modifiedOn;
    }

    rename(categoryName: CategoryName) {
        if(this._name.equals(categoryName)) {
            return;
        }
        this.apply(new CategoryNameWasUpdated(this.id.value, categoryName.value));
    }

    private onCategoryWasRenamed(event: CategoryNameWasUpdated) {
        this._name = CategoryName.fromString(event.name);
    }


}