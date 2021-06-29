import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { BUSINESSES,Businesses } from "../../domain";
import { CreateBusinessCommand } from "./create-business.command";

@CommandHandler(CreateBusinessCommand)
export class CreateBusinessHandler implements ICommandHandler<CreateBusinessCommand> {
    constructor(
       @Inject(BUSINESSES) private businesses: Businesses
    ) {}

    async execute(command: CreateBusinessCommand) {
        //TODO
        this.businesses.save();
    }
}