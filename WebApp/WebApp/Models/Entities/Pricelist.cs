using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Pricelist
    {
        public int Id { get; set; }
        public double StartingPrice { get; set; }
        public double StudentMultiplicator { get; set; }
        public double RegularMultiplicator { get; set; }
        public double PensionerMultiplicator { get; set; }
        public double UrbanMultiplicator { get; set; }
        public double SuburbanMultipilicator { get; set; }
        public double HourlyTicketMultiplicator { get; set; }
        public double DailyTicketMultiplicator { get; set; }
        public double MonthlyTicketMultiplicator { get; set; }
        public double YearlyTicketMultiplicator { get; set; }
        public double TotalPrice { get; set; }
        //public virtual List<Ticket> Tickets { get; set; }
        //public double Price { get; set; }
        //public TypeOfTicket TicketType { get; set; }
        //public TypeOfPassanger PassangerType { get; set; }
    }
}