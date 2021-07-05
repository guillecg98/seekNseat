import { Category,CategoryId } from "../model";

export interface  Categories {
    find(categoryId: CategoryId): Promise<Category | null>;
    save(category: Category): void;
}

export const CATEGORIES = 'CATEGORIES';