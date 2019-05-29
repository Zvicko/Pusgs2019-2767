using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class StationRepository : Repository<Station, int>, IStationRepository
    {
        public StationRepository(DbContext context) : base(context)
        {

        }
        protected ApplicationDbContext DemoContext { get { return context as ApplicationDbContext; } }
        public IEnumerable<Station> GetAll(int pageIndex, int pageSize)
        {
            return DemoContext.Stations.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }
    }
}