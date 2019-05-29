using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class PricelistRepository : Repository<Pricelist, int>, IPricelistRepository
    {
        public PricelistRepository(DbContext context) : base(context)
        {

        }
        protected ApplicationDbContext DemoContext { get { return context as ApplicationDbContext; } }
        public IEnumerable<Pricelist> GetAll(int pageIndex, int pageSize)
        {
            return DemoContext.Pricelists.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }
    }
}