import { Category,CategoryId } from "../model";

export interface  Categories {
    find(categoryId: CategoryId): Promise<Category | null>;
    findAll(): Promise<Category[]>;
    save(category: Category): void;
}

export const CATEGORIES = 'CATEGORIES';