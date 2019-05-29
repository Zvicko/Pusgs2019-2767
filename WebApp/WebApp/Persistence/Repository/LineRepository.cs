using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class LineRepository : Repository<Line, int>, ILineRepository
    {
        public LineRepository(DbContext context) : base(context)
        {

        }

        protected ApplicationDbContext DemoContext { get { return context as ApplicationDbContext; } }

        public IEnumerable<Line> GetAll(int pageIndex, int pageSize)
        {
            return DemoContext.Lines.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }
    }
}