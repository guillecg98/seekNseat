import { CategoryId } from "../model";
import { CategoryIdNotFoundError } from "./category-id-not-found.error";

export class CategoryIdAlreadyTakenError extends Error {
    public static with(categoryId: CategoryId): CategoryIdNotFoundError {
        return new CategoryIdNotFoundError(`Cateogry id ${categoryId.value} already taken`);
    }
}