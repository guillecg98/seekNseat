import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import {
    Business,
    BusinessContactPhone,
    BUSINESSES,
    Businesses,
    BusinessId,
    BusinessName,
} from "../../domain";
import { CreateBusinessCommand } from "./create-business.command";

@CommandHandler(CreateBusinessCommand)
export class CreateBusinessHandler implements ICommandHandler<CreateBusinessCommand> {
    constructor(
       @Inject(BUSINESSES) private businesses: Businesses
    ) {}

    async execute(command: CreateBusinessCommand) {
        const id = BusinessId.fromString(command.id);
        const name = BusinessName.fromString(command.name);
        const contactPhone = BusinessContactPhone.fromString(command.contactPhone);

        if(await this.businesses.find(id)) {
            throw new Error('Business already exists');
            //TODO - throw BusinessIdAlreadyTakenError.with(id);
        }

        const business = Business.create(id,name, contactPhone);
        this.businesses.save(business);
    }
}