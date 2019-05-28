using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface IUserRepository : IRepository<User,int>
    {
        IEnumerable<User> GetAll(int pageIndex, int pageSize);

    }
}
