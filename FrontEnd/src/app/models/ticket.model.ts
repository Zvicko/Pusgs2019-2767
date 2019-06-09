export class Ticket
{
    Id: number;
    Price: number;
    TicketType: TypeOfTicket;
    PassangerType: TypeOfPassanger;
}

export class BuyTicket
{
    constructor(
    public TicketType: TypeOfTicket,
    public PassangerType : TypeOfPassanger,
    public TransportationType:TypeOfTransportation,

    ){}

}