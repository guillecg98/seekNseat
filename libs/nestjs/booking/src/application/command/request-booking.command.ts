import { ICommand } from "@nestjs/cqrs";

export class RequestBookingCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly businessId: string,
        public readonly numerOfFoodies: number,
        public readonly time: Date,
    ) {}
}