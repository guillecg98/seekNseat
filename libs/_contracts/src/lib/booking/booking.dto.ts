export class BookingDTO {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly businessId: string,
        //public readonly bookingTime: DateTime,
        public readonly numberOfFoodies: number,
        public readonly bookingState: string,
        public readonly noShow: boolean,
    ) {}
}