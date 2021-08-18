import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { EditBusinessDTO } from '@seekNseat/contracts/business';

export type BusinessProfileWasEditedProps = Omit<EditBusinessDTO, 'categories'>;
export class BusinessProfileWasEdited extends Event<BusinessProfileWasEditedProps> {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly contactPhone: string,
    public readonly address: string,
    public readonly description: string
  ) {
    super(id, { name, contactPhone, address, description });
  }
}
