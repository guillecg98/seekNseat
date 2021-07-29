import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  BusinessDTO,
  CreateBusinessDTO,
  EditBusinessDTO,
} from '@seekNseat/contracts/business';

import {
  CreateBusinessCommand,
  DeleteBusinessCommand,
  EditBusinessCommand,
  GetBusinessesQuery,
  GetBusinessQuery,
} from '../../application';

@Injectable()
export class BusinessService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async findOne(id: string): Promise<BusinessDTO> {
    return this.queryBus.execute<GetBusinessQuery, BusinessDTO>(
      new GetBusinessQuery(id)
    );
  }

  async findAll(): Promise<BusinessDTO[]> {
    return this.queryBus.execute<GetBusinessesQuery, BusinessDTO[]>(
      new GetBusinessesQuery()
    );
  }

  async create(createBusinessDTO: CreateBusinessDTO): Promise<BusinessDTO> {
    await this.commandBus.execute(
      new CreateBusinessCommand(
        createBusinessDTO._id,
        createBusinessDTO.name,
        createBusinessDTO.contactPhone
      )
    );

    return new BusinessDTO(createBusinessDTO);
  }

  async edit(
    id: string,
    editBusinessDTO: EditBusinessDTO
  ): Promise<BusinessDTO> {
    await this.commandBus.execute(
      new EditBusinessCommand(
        id,
        editBusinessDTO.name,
        editBusinessDTO.contactPhone,
        editBusinessDTO.address,
        editBusinessDTO.description
      )
    );

    return this.findOne(id);
  }

  async delete(id: string) {
    await this.commandBus.execute(new DeleteBusinessCommand(id));
  }
}
