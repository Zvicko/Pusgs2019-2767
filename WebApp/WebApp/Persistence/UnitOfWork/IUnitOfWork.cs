using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Persistence.Repository;

namespace WebApp.Persistence.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        
        IUserRepository AppUsers { get; set; }
        ILineRepository Lines { get; set; }
        IPricelistRepository Pricelists { get; set; }
        IStationRepository Stations { get; set; }
        ITicketRepository Tickets { get; set; }
        ITimeTableRepository TimeTables { get; set; }
        IVehicleRepository Vehicles { get; set; }

        int Complete();
    }
}
