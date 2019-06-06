using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Passanger : User
    {
        public Passanger()
        {
            UserType = TypeOfUser.Passanger;
        }
        public TypeOfPassanger PassangerType { get; set; }
        public virtual Ticket PassangerTicket { get; set; }
        public bool Verified { get; set; }
        public string PhotoPath { get; set; }


    }
}