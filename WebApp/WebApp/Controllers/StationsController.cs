using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class StationsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        private readonly IUnitOfWork unitOfWork;

        public StationsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Stations
        public IEnumerable<Station> GetStations()
        {
            return db.Stations.ToList();
        }

        // GET: api/Stations/5
        [ResponseType(typeof(Station))]
        public IHttpActionResult GetStation(int id)
        {
            Station station = db.Stations.Find(id);
            if (station == null)
            {
                return NotFound();
            }

            return Ok(station);
        }

        // PUT: api/Stations/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStation(int id, Station station)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != station.Id)
            {
                return BadRequest();
            }

            db.Entry(station).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Stations
        [ResponseType(typeof(Station))]
        public IHttpActionResult PostStation(StationModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Station station = db.Stations.Where(s => s.Name == model.Name).FirstOrDefault();
            if (station == null)
            {
                Station newStation = new Station();
                newStation.Name = model.Name;
                newStation.Address = model.Address;
                newStation.Latitude = model.Latitude;
                newStation.Longitude = model.Longitude;
                db.Stations.Add(newStation);
                db.SaveChanges();
                return Ok();
            }
            else
            {
                station.Name = model.Name;
                station.Address = model.Address;
                station.Latitude = model.Latitude;
                station.Longitude = model.Longitude;
                db.Stations.Add(station);
                db.SaveChanges();
                return Ok();

            }

        

           
        }
        [HttpPost]
        [Route("api/Stations/AddLine")]
        public IHttpActionResult AddLine(AddLineToStation model) // testirati ovo
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Station station = db.Stations.Where(s => s.Name == model.StationName).FirstOrDefault();
            Line line = db.Lines.Where(l => l.LineNumber == model.LineNumber).FirstOrDefault();

            if (station != null)
            {
                if (line != null)
                {
                    station.Lines.Add(line);
                    line.Stations.Add(station);
                  
                    
                    db.Entry(station).State = EntityState.Modified;
                    db.Entry(line).State = EntityState.Modified;
                    db.SaveChanges();
                    return Ok();
                }
                else
                {
                    Line newLine = new Line();
                    newLine.LineNumber = model.LineNumber;
                    station.Lines.Add(newLine);
                    newLine.Stations.Add(station);
                    db.Lines.Add(newLine);
                    db.Entry(station).State = EntityState.Modified;
                    db.SaveChanges();
                    return Ok();
                }


            }
            else
            {
                if (line != null)
                {
                    Station newStation = new Station();
                    newStation.Name = model.StationName;
                    newStation.Lines.Add(line);
                    line.Stations.Add(newStation);
                    db.Stations.Add(newStation);
                    db.Entry(line).State = EntityState.Modified;
                    db.SaveChanges();
                    return Ok();

                }
                else
                {
                    Station newStation = new Station();
                    Line newLine = new Line();
                    newStation.Name = model.StationName;
                    newLine.LineNumber = model.LineNumber;
                    newStation.Lines.Add(newLine);
                    newLine.Stations.Add(newStation);
                    db.Stations.Add(newStation);
                    db.Lines.Add(newLine);
                    db.SaveChanges();
                    return Ok();
                }

            }
            

        }

        // DELETE: api/Stations/5
        [ResponseType(typeof(Station))]
        public IHttpActionResult DeleteStation(int id)
        {
            Station station = db.Stations.Find(id);
            if (station == null)
            {
                return NotFound();
            }

            db.Stations.Remove(station);
            db.SaveChanges();

            return Ok(station);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StationExists(int id)
        {
            return db.Stations.Count(e => e.Id == id) > 0;
        }
    }
}