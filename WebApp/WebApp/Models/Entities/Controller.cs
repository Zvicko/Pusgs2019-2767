using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Controller : User
    {
        public Controller()
        {
           UserType =  TypeOfUser.Controller;
        }


    }
}