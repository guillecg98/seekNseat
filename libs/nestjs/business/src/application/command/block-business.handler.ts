import { AggregateRepository, InjectAggregateRepository } from "@aulasoftwarelibre/nestjs-eventstore";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { Business, BusinessId } from "../../domain";
import { BlockBusinessCommand } from "./block-business.command";

@CommandHandler(BlockBusinessCommand)
export class BlockBusinessHandler implements ICommandHandler<BlockBusinessCommand> {
  constructor(
    @InjectAggregateRepository(Business) private readonly businesses: AggregateRepository<Business, BusinessId>
  ) {}

  async execute(command: BlockBusinessCommand) {
    const id = BusinessId.fromString(command.id);
    const business = await this.businesses.find(id);

    if (!business) {
      throw new Error('Business not found')
    }

    const blocked = command.blocked;

    business.blockBookingRequests(blocked);
    this.businesses.save(business);
  }
}