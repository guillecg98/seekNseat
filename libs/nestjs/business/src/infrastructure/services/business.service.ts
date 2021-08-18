import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  BlockBusinessDTO,
  BusinessDTO,
  CreateBusinessDTO,
  EditBusinessDTO,
} from '@seekNseat/contracts/business';

import {
  BlockBusinessCommand,
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

  async create(createBusinessDTO: CreateBusinessDTO): Promise<BusinessDTO> {
    await this.commandBus.execute(
      new CreateBusinessCommand(
        createBusinessDTO._id,
        createBusinessDTO.ownerId,
        createBusinessDTO.name,
        createBusinessDTO.contactPhone,
        createBusinessDTO.categories
      )
    );

    return new BusinessDTO(createBusinessDTO);
  }

  async findAll(category: string): Promise<BusinessDTO[]> {
    return this.queryBus.execute<GetBusinessesQuery, BusinessDTO[]>(
      new GetBusinessesQuery(category)
    );
  }

  async findOne(id: string): Promise<BusinessDTO> {
    return this.queryBus.execute<GetBusinessQuery, BusinessDTO>(
      new GetBusinessQuery(id)
    );
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
        editBusinessDTO.description,
        editBusinessDTO.categories
      )
    );

    return this.findOne(id);
  }

  async block(
    id: string,
    blockBusinessDTO: BlockBusinessDTO
  ): Promise<BusinessDTO> {
    await this.commandBus.execute(
      new BlockBusinessCommand(id, blockBusinessDTO.blocked)
    );

    return this.findOne(id);
  }

  async delete(id: string) {
    await this.commandBus.execute(new DeleteBusinessCommand(id));
  }
}
