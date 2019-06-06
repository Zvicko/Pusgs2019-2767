using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Administrator : User
    {
        public Administrator()
        {
            UserType = TypeOfUser.Admin;
        }

    }
}