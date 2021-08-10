import {
  AggregateRepository,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery, UserId } from '@seekNseat/nestjs/user';

import {
  Business,
  BusinessContactPhone,
  BusinessId,
  BusinessName,
} from '../../domain';
import { CreateBusinessCommand } from './create-business.command';

@CommandHandler(CreateBusinessCommand)
export class CreateBusinessHandler
  implements ICommandHandler<CreateBusinessCommand>
{
  constructor(
    @InjectAggregateRepository(Business)
    private readonly businesses: AggregateRepository<Business, BusinessId>,
    private readonly queryBus: QueryBus
  ) {}

  async execute(command: CreateBusinessCommand) {
    const id = BusinessId.fromString(command.id);
    const ownerId = UserId.fromString(command.ownerId);
    const name = BusinessName.fromString(command.name);
    const contactPhone = BusinessContactPhone.fromString(command.contactPhone);

    if (await this.businesses.find(id)) {
      throw new Error('Business already exists');
      //TODO - throw BusinessIdAlreadyTakenError.with(id);
    }

    const owner = await this.queryBus.execute(new GetUserQuery(ownerId.value));
    if (Object.keys(owner).length === 0) {
      throw new Error('User not found');
    }

    const business = Business.create(id, ownerId, name, contactPhone);
    this.businesses.save(business);
  }
}
