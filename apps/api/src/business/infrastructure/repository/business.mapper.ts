import { Injectable } from "@nestjs/common";
import { BusinessDTO } from "@seekNseat/contracts";

import { Business } from "../../domain";
import { BusinessView } from "../read-model/schema/business.schema";

@Injectable()
export class BusinessMapper {
    aggregateToDTO(business: Business): BusinessDTO {

        return new BusinessDTO(
            business.id.value,
            business.name.value,
            business.contactPhone.value,
            business.address,
            business.description,
            //TODO (categories, images...)
        );
    }
    viewToDto(businessView: BusinessView): BusinessDTO {

        const { _id: id, ...data } = businessView.toObject();
        return {
            id,
            ...data
        }
    }
}