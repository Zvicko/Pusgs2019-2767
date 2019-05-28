using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class TimeTable
    { 
        public TypeOfDay Day { get; set; }
        public List<DateTime> Departures { get; set; }
        public virtual Line Line { get; set; }
    }
}