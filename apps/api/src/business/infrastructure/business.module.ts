import { Module } from "@nestjs/common";

const CommandHandlers = [];
const QueryHandlers = [];
const ProjectionHandlers = [];

@Module({
    controllers: [],
    imports: [],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers,
        ...ProjectionHandlers,
    ]
})

export class BusinessModule {}