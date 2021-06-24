import { Injectable } from "@nestjs/common";
import { CategoryDTO } from "@seekNseat/contracts";

import { Category } from "../../domain";

@Injectable()
export class CategoryMapper {
    aggregateToDTO(category: Category): CategoryDTO {

        return new CategoryDTO(
            category.id.value,
            category.name.value
        );
    }
}