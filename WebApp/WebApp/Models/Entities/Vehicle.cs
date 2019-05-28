using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //public virtual Location Location { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}