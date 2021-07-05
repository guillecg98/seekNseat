import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { BusinessContactPhone, BUSINESSES, Businesses, BusinessId, BusinessName } from "../../domain";
import { EditBusinessCommand } from "./edit-business.command";

@CommandHandler(EditBusinessCommand)
export class EditBusinessHandler implements ICommandHandler<EditBusinessCommand> {
    constructor(
        @Inject(BUSINESSES) private businesses: Businesses
    ) {}

    async execute(command: EditBusinessCommand) {
        const id = BusinessId.fromString(command.id);
        const business = await this.businesses.find(id);

        if(!business) {
            throw new Error('Business not found');
            //TODO
            //throw BusinessIdNotFoundError.with(id);
        }

        const name = BusinessName.fromString(command.name);
        const contactPhone = BusinessContactPhone.fromString(command.contactPhone);
        const address = command.address;
        const description = command.description;

        business.editProfile(name,contactPhone,address,description);
        this.businesses.save(business);
    }
}