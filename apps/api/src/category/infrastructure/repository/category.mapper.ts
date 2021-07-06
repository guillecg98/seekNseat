import { Injectable } from "@nestjs/common";
import { CategoryDTO } from "@seekNseat/contracts";

import { Category } from "../../domain";
import { CategoryView } from "../read-model/schema/category.schema";

@Injectable()
export class CategoryMapper {
    aggregateToDTO(category: Category): CategoryDTO {

        return new CategoryDTO(
            category.id.value,
            category.name.value
        );
    }

    viewToDto(categoryView: CategoryView): CategoryDTO {

        const { _id: id, ...data } = categoryView.toObject();
        return {
            id,
            ...data
        }
    }

}