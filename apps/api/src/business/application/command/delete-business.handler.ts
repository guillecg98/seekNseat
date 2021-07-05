import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { BUSINESSES, Businesses, BusinessId } from "../../domain";
import { DeleteBusinessCommand } from "./delete-business.command";

@CommandHandler(DeleteBusinessCommand)
export class DeleteBusinessHandler implements ICommandHandler<DeleteBusinessCommand> {
    constructor(
        @Inject(BUSINESSES)
        private businesses: Businesses
    ) {}

    async execute(command: DeleteBusinessCommand) {
        const id = BusinessId.fromString(command.id);
        const business = await this.businesses.find(id);

        if(!business) {
            throw new Error('Business not found')
            //TODO BusinessIdNotFoundError.with(id)
        }

        business.delete();
        this.businesses.save(business);
    }
}