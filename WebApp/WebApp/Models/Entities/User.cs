using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class AppUser
    {
        public int Id { get; set; }
        
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string UserAddress { get; set; } // ili kao string ili kao klasu npr. Address 
        public DateTime? BirthDay { get; set; }
        public TypeOfUser UserType { get; set; }
        
    }
}