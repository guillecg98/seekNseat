import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { EventSourcingModule } from "event-sourcing-nestjs";

import { DatabaseModule } from "../../database/database.module";
import { CreateBusinessHandler, DeleteBusinessHandler, EditBusinessHandler, GetBusinessHanlder } from "../application";
import { GetBusinessesHandler } from "../application/query/get-businesses.handler";
import { BusinessProviders } from "./business.providers";
import { BusinessController } from "./controller/business.controller";
import { BusinessProfileWasEditedProjection } from "./read-model/projection/business-profile-was-edited.projection";
import { BusinessWasCreatedProjection } from "./read-model/projection/business-was-created.projection";
import { BusinessWasDeletedProjection } from "./read-model/projection/business-was-deleted.projection";
import { BusinessMapper } from "./repository/business.mapper";

const CommandHandlers = [
    CreateBusinessHandler,
    EditBusinessHandler,
    DeleteBusinessHandler,
];
const QueryHandlers = [
    GetBusinessHanlder,
    GetBusinessesHandler,
];
const ProjectionHandlers = [
    BusinessWasCreatedProjection,
    BusinessProfileWasEditedProjection,
    BusinessWasDeletedProjection,
];

@Module({
    controllers: [BusinessController],
    imports: [CqrsModule, EventSourcingModule.forFeature(), DatabaseModule],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers,
        ...ProjectionHandlers,
        ...BusinessProviders,
        BusinessMapper,
    ]
})

export class BusinessModule {}