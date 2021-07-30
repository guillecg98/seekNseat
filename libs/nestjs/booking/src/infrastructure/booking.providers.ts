import { Provider } from "@nestjs/common";

import { BOOKING_FINDER } from "../application";
import { BookingFinder } from "./services";

export const bookingProviders: Provider[] = [
  {
    provide: BOOKING_FINDER,
    useClass: BookingFinder,
  }
]