import { Provider } from "@nestjs/common";
import { Connection } from "mongoose";

import { DATABASE_CONNECTION } from "../../database/database.provider";
import { BUSINESSES } from "../domain";
import { BUSINESS_MODEL,BusinessSchema } from "./read-model/schema/business.schema";
import { BusinessRepository } from "./repository/business.respository";

export const BusinessProviders: Provider [] = [
    {
        provide: BUSINESS_MODEL,
        useFactory: (connection: Connection) =>
        connection.model('Business', BusinessSchema),
        inject: [DATABASE_CONNECTION],
    },
    {
        provide: BUSINESSES,
        useClass: BusinessRepository,
    },
]