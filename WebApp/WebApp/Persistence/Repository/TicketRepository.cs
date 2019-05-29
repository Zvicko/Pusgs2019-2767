using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class TicketRepository : Repository<Ticket, int>, ITicketRepository
    {
        public TicketRepository(DbContext context) : base(context)
        {

        }

        protected ApplicationDbContext DemoContext { get { return context as ApplicationDbContext; } }

        public IEnumerable<Ticket> GetAll(int pageIndex, int pageSize)
        {
            return DemoContext.Tickets.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }
    }
}