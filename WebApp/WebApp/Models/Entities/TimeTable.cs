using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class TimeTable
    {
        public int Id { get; set; }
        public TypeOfDay Day { get; set; }
        public TypeOfTransportation Transportation { get; set; }
        public virtual List<Departure> Departures { get; set; }
        public virtual Line Line { get; set;}
    }
}