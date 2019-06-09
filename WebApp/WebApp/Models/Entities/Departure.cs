using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Departure
    {
        public int Id { get; set; }
        public DateTime DepartureTime { get; set; }
    }
}