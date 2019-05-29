using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class TimeTableRepository : Repository<TimeTable, int>, ITimeTableRepository
    {
        public TimeTableRepository(DbContext context) : base(context)
        {

        }
        protected ApplicationDbContext DemoContext { get { return context as ApplicationDbContext; } }

        public IEnumerable<TimeTable> GetAll(int pageIndex, int pageSize)
        {
            return DemoContext.TimeTables.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }
    }
}