import { CategoryName } from "../model"

export class CategoryNameAlreadyTaken extends Error {
    public static with(categoryName: CategoryName): CategoryNameAlreadyTaken {
        return new CategoryNameAlreadyTaken(
            `Category name ${categoryName.value} already taken`
        );
    }
}