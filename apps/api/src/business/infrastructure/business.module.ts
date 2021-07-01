import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { EventSourcingModule } from "event-sourcing-nestjs";

import { AuthModule } from "../../auth/auth.module";
import { DatabaseModule } from "../../database/database.module";
import { CreateBusinessHandler, GetBusinessHanlder } from "../application";
import { BusinessProviders } from "./business.providers";
import { BusinessController } from "./controller/business.controller";
import { BusinessWasCreatedProjection } from "./read-model/projection/business-was-created.projection";
import { BusinessMapper } from "./repository/business.mapper";

const CommandHandlers = [
    CreateBusinessHandler,
];
const QueryHandlers = [
    GetBusinessHanlder,
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
        BusinessMapper,
    ]
})

export class BusinessModule {}