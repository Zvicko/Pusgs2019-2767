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

export class TicketList
{
    constructor(
    public Id : number,
    public Price : number,
    public DateOfIssue : Date,
    public ExpireDate : Date,
    public TicketType: TypeOfTicket,
    public PassangerType : TypeOfPassanger,
    public VerifiedByController: boolean 
    ){}

}