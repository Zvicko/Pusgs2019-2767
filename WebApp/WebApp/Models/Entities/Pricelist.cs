using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Pricelist
    {
        
        public double Price { get; set; }
        public TypeOfTicket TicketType { get; set; }
        public TypeOfPassanger PassangerType { get; set; }
    }
}