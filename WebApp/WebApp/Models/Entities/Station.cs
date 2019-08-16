using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Station
    {
        public int Id { get; set; }
        public string Name { get; set;}
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        //public virtual Location Location { get; set; } 
        [JsonIgnore]
        public List<Line> Lines { get; set; }
    }
}