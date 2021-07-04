import { Injectable } from "@nestjs/common";
import { BusinessDTO } from "@seekNseat/contracts";

import { Business } from "../../domain";

@Injectable()
export class BusinessMapper {
    aggregateToDTO(business: Business): BusinessDTO {

        return new BusinessDTO(
            business.id.value,
            business.name.value,
            business.contactPhone.value,
            //TODO (address, categories, images...)
        );
    }
}