import { AggregateRepository, InjectAggregateRepository } from "@aulasoftwarelibre/nestjs-eventstore";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { Business, BusinessId } from "../../domain";
import { DeleteBusinessCommand } from "./delete-business.command";

@CommandHandler(DeleteBusinessCommand)
export class DeleteBusinessHandler implements ICommandHandler<DeleteBusinessCommand> {
    constructor(
        @InjectAggregateRepository(Business)
        private businesses: AggregateRepository<Business, BusinessId>
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