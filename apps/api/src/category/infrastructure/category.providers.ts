import { Provider } from "@nestjs/common";
import { Connection } from "mongoose";

import { DATABASE_CONNECTION } from "../../database/database.provider";
import { CATEGORIES } from "../domain";
import { CATEGORY_MODEL,CategorySchema } from "./read-model/schema/category.schema";
import { CategoryRepository } from "./repository/category.repository";

export const CategoryProviders: Provider[] = [
    {
        provide: CATEGORY_MODEL,
        useFactory: (connection: Connection) =>
        connection.model('Category', CategorySchema),
        inject: [DATABASE_CONNECTION],
    },
    {
        provide: CATEGORIES,
        useClass: CategoryRepository,
    },
]