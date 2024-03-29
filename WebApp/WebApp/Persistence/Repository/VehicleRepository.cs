﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class VehicleRepository : Repository<Vehicle, int>, IVehicleRepository
    {
        public VehicleRepository(DbContext context) : base(context)
        {

        }

        protected ApplicationDbContext DemoContext { get { return context as ApplicationDbContext; } }

        public IEnumerable<Vehicle> GetAll(int pageIndex, int pageSize)
        {
            return DemoContext.Vehicles.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }

    }
}