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
        //private readonly IUnitOfWork unitOfWork;
        public IUnitOfWork UnitOfWork { get; set; }
        private object syncLock = new object();
        public StationsController(IUnitOfWork unitOfWork)
        {
            this.UnitOfWork = unitOfWork;
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
        [Authorize(Roles = "Admin")]
        public IHttpActionResult PutStation(Station station)
        {
            
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                Station s = UnitOfWork.Stations.Get(station.Id);

            if (s == null)
            {
                return Content(HttpStatusCode.Conflict, "Stanica je u medjuvremenu obrisana od strane drugog administratora");
            }

                s.Address = station.Address;                    
                s.Latitude = station.Latitude;
                s.Longitude = station.Longitude;
                
                s.Name = station.Name;

                if (StationExists(s.Id))
                {
                    UnitOfWork.Stations.Update(s);
                }
                else
                {
                    return NotFound();
                }

                try
                {
                    UnitOfWork.Complete();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    return Content(HttpStatusCode.Conflict, ex);
                }
                
                catch (Exception e)
                {
                    return InternalServerError(e);
                }

                return StatusCode(HttpStatusCode.NoContent);
            
            //Station s = db.Stations.Where(st => st.Id == id).FirstOrDefault();
            //if(s != null)
            //{
            //    s.Name = station.Name;
            //    s.Address = station.Address;
            //    s.Latitude = station.Latitude;
            //    s.Longitude = station.Longitude;
            //    db.Entry(s).State = EntityState.Modified;
            //    db.SaveChanges();
            //    return Ok();


            //}
            //return NotFound();
        }

        // POST: api/Stations
        [ResponseType(typeof(Station))]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult PostStation(StationModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!StationExists(model.Id))
            {
                Station station = new Station();
                station.Address = model.Address;
                station.Latitude = model.Latitude;
                station.Longitude = model.Longitude;
                station.Name = model.Name;
                UnitOfWork.Stations.Add(station);

                try
                {
                    UnitOfWork.Complete();
                    return Content(HttpStatusCode.OK,"Stanica je kreirana");
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    return Content(HttpStatusCode.Conflict, ex);
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }
            else
            {
                return Content(HttpStatusCode.Conflict, "Stanica vec postoji!");
            }
            

            //Station station = db.Stations.Where(s => s.Id == model.Id).FirstOrDefault();
            //if (station == null)
            //{
            //    Station newStation = new Station();
            //    newStation.Name = model.Name;
            //    newStation.Address = model.Address;
            //    newStation.Latitude = model.Latitude;
            //    newStation.Longitude = model.Longitude;
            //    db.Stations.Add(newStation);
            //    db.SaveChanges();
            //    return Ok();
            //}
            //else
            //{
            //    station.Name = model.Name;
            //    station.Address = model.Address;
            //    station.Latitude = model.Latitude;
            //    station.Longitude = model.Longitude;
            //    db.Stations.Add(station);
            //    db.SaveChanges();
            //    return Ok();

            //}

        

           
        }
        [HttpPost]
        [Route("api/Stations/AddLine")]
        [Authorize(Roles = "Admin")]
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
                    // proveriti da li ovo valja
                    station.Lines = new List<Line>();
                    line.Stations = new List<Station>(); 
                    /////////////////////////////////////


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

                    //
                    if (station.Lines == null)
                    {
                        station.Lines = new List<Line>();
                    }
                    if (newLine.Stations == null)
                    {
                        newLine.Stations = new List<Station>();
                    }
                    //

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

                    //
                    if (newStation.Lines == null)
                    {
                        newStation.Lines = new List<Line>();
                    }
                    if (line.Stations == null)
                    {
                        line.Stations = new List<Station>();
                    }


                    //
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
                    newStation.Lines = new List<Line>();
                    newLine.Stations = new List<Station>();
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
        [Authorize(Roles = "Admin")]
        public IHttpActionResult DeleteStation(int id)
        {
            Station station = UnitOfWork.Stations.Get(id);
            if (station == null)
            {
                return NotFound();
            }

            UnitOfWork.Stations.Remove(station);
            UnitOfWork.Complete();

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
            return UnitOfWork.Stations.Get(id) != null;
        }
    }
}