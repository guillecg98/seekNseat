import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BusinessDTO, CreateBusinessDTO } from "@seekNseat/contracts";

import { CreateBusinessCommand } from "../../application/command/create-business.command";

@ApiBearerAuth()
@ApiTags('businesses')
@Controller('businesses')
@UseInterceptors(ClassSerializerInterceptor)
export class BusinessController {
    constructor(
        private queryBus: QueryBus,
        private commandBus: CommandBus,
    ) {}

    @Post()
    @ApiResponse({ status: 200, description: 'Business created'})
    async create(@Body() createBusinessDTO: CreateBusinessDTO): Promise<BusinessDTO> {
        try {
            return await this.commandBus.execute(
                new CreateBusinessCommand(
                    createBusinessDTO.id,
                    createBusinessDTO.name,
                    //createBusiness.contactPhone,
                )
            );
        } catch(e) {
            if(e instanceof Error) {
                throw new BadRequestException(e.message);
            } else {
                throw new BadRequestException('Server Error');
            }
        }
    }
}