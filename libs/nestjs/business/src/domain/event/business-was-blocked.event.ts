import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { BlockBusinessDTO } from "@seekNseat/contracts/business";

export class BusinessWasBlocked extends Event<BlockBusinessDTO> {
  constructor(
    public readonly id: string,
    public readonly blocked: boolean
  ) {
    super(id, {blocked});
  }
}