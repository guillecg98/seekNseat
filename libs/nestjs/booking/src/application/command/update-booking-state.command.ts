import { ICommand } from "@nestjs/cqrs";

export class UpdateBookingStateCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly bookingState: string,
    ) {}
}