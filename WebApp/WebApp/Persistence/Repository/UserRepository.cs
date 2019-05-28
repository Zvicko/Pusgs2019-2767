using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class UserRepository : Repository<User, int>, IUserRepository
    {
        public UserRepository(DbContext context) : base(context)
        {

        }

        protected ApplicationDbContext DemoContext { get { return context as ApplicationDbContext; } }
        public IEnumerable<User> GetAll(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }
    }
}