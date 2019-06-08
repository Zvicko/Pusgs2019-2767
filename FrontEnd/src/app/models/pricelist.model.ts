export class Pricelist
{

    constructor(
        public Id: number,
        public StartingPrice: number,
        public StudentMultiplicator: number,
        public RegularMultiplicator: number,
        public PensionerMultiplicator: number,
        public UrbanMultiplicator:  number,
        public SuburbanMultiplicator: number,
        public HourlyTicketMultiplicator: number,
        public DailyTicketMultiplicator: number,
        public MonthlyTicketMultiplicator: number,
        public YearlyTicketMultiplicator: number
    
    )
            {}

}