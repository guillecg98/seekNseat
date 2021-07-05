import { CategoryDTO } from "../category";

export class BusinessDTO {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly contactPhone: string,
        public readonly address?: string,
        public readonly description?: string,
        //public readonly images: string[],
        //public readonly categories: CategoryDTO[],
    ) {}
}