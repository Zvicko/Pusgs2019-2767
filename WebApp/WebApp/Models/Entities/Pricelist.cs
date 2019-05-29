using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Pricelist
    {
        public int Id { get; set; }
        public virtual List<Ticket> Tickets { get; set; }
        //public double Price { get; set; }
        //public TypeOfTicket TicketType { get; set; }
        //public TypeOfPassanger PassangerType { get; set; }
    }
}