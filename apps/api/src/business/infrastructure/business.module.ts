import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { EventSourcingModule } from "event-sourcing-nestjs";

import { AuthModule } from "../../auth/auth.module";
import { DatabaseModule } from "../../database/database.module";
import { CreateBusinessHandler } from "../application";
import { BusinessProviders } from "./business.providers";
import { BusinessController } from "./controller/business.controller";
import { BusinessWasCreatedProjection } from "./read-model/projection/business-was-created.projection";

const CommandHandlers = [
    CreateBusinessHandler,
];
const QueryHandlers = [

];
const ProjectionHandlers = [
    BusinessWasCreatedProjection,
];

@Module({
    controllers: [BusinessController],
    imports: [AuthModule, CqrsModule, EventSourcingModule.forFeature(), DatabaseModule],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers,
        ...ProjectionHandlers,
        ...BusinessProviders,
    ]
})

export class BusinessModule {}