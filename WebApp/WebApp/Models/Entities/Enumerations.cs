using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public enum TypeOfTicket { Hourly, Daily, Monthly, Yearly };
    public enum TypeOfPassanger {Ordinary, Student, Pensioner};
    public enum TypeOfUser {Passanger, Controller, Admin };
    public enum TypeOfDay {Working, Saturday, Sunday };
    public enum TypeOfTransportation { Urban, Suburban};
}