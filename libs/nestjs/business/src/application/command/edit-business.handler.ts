import {
  AggregateRepository,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  Business,
  BusinessContactPhone,
  BusinessId,
  BusinessName,
} from '../../domain';
import { EditBusinessCommand } from './edit-business.command';

@CommandHandler(EditBusinessCommand)
export class EditBusinessHandler
  implements ICommandHandler<EditBusinessCommand>
{
  constructor(
    @InjectAggregateRepository(Business)
    private readonly businesses: AggregateRepository<Business, BusinessId>
  ) {}

  async execute(command: EditBusinessCommand) {
    const id = BusinessId.fromString(command.id);
    const business = await this.businesses.find(id);

    if (!business) {
      throw new Error('Business not found');
      //TODO
      //throw BusinessIdNotFoundError.with(id);
    }

    const name = BusinessName.fromString(command.name);
    const contactPhone = BusinessContactPhone.fromString(command.contactPhone);
    const address = command.address;
    const description = command.description;

    business.editProfile(name, contactPhone, address, description);
    this.businesses.save(business);
  }
}
