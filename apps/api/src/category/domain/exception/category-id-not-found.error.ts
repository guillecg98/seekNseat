import { CategoryId } from "../model";

export class CategoryIdNotFoundError extends Error {
    public static with(categoryId: CategoryId) {
        return new CategoryIdNotFoundError(`Category id ${categoryId.value} not found`);
    }
}