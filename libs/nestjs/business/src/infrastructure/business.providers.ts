import { Provider } from "@nestjs/common";
import { Connection } from "mongoose";

import { BUSINESS_FINDER } from '../application';
import { BusinessFinder } from "./services";


export const businessProviders: Provider [] = [
    {
        provide: BUSINESS_FINDER,
        useClass: BusinessFinder,
    },
]