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

    public static add(
        id: CategoryId,
        name: CategoryName
    ): Category {
        const category = new Category();
        category.apply(
            new CategoryWasCreated(id.value, name.value)
        );
        return category;
    }

    get id(): CategoryId {
        return this._id;
    }

    get name(): CategoryName {
        return this._name;
    }

    delete(): void {
        if(this._deleted) {
            return;
        }

        this.apply(new CategoryWasDeleted(this.id.value))
    }

    updateCategoryName(categoryName: CategoryName) {
        if(this._name.equals(categoryName)) {
            return;
        }

        this.apply(new CategoryNameWasUpdated(this.id.value, categoryName.value));
    }
}