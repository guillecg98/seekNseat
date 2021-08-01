import { ICommand } from "@nestjs/cqrs";

export class CancelBookingCommand implements ICommand {
    constructor(public readonly id: string) {}
}