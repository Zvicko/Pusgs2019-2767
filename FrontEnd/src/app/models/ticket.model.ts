export class Ticket
{
    constructor(
        public TicketType: TypeOfTicket,
        public PassangerType : TypeOfPassanger,
        public TransportationType:TypeOfTransportation,
    
        ){}
}

export class BuyTicket
{
    constructor(
    public TicketType: TypeOfTicket,
    public PassangerType : TypeOfPassanger,
    public TransportationType:TypeOfTransportation,
    public Price : number
    // public DateOfIssue : Date,
    // public ExpireDate : Date
    ){}

}