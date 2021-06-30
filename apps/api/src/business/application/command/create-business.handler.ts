import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import {
    Business,
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

        //TODO - handle same id Error
        // if(await this.businesses.find(id)) {
        //     throw BusinessIdAlreadyTakenError.with(id);
        // }

        const business = Business.add(id,name);
        this.businesses.save(business);
    }
}