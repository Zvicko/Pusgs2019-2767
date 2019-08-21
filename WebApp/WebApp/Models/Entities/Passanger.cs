using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Passanger : AppUser
    {
        public Passanger()
        {
            UserType = TypeOfUser.Passanger;
        }
        public TypeOfPassanger PassangerType { get; set; }
        public virtual Ticket PassangerTicket { get; set; }
        
        public VerificationStatus Verified { get; set; }
        
        public string PhotoPath { get; set; }


    }
}