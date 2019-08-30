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
    public class TimeTablesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        private IUnitOfWork unitOfWork;

        public TimeTablesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/TimeTables
        public IEnumerable<TimeTable> GetTimeTables()
        {
            return db.TimeTables.ToList();
        }
        [Route("api/TimeTables/GetTimeTablesUrban")]
        public IEnumerable<Line> GetTimeTablesUrban()
        {
           List<TimeTable> timeTables = db.TimeTables.Where(l => l.Line.Stations.Where(s => s.Name != null).FirstOrDefault() != null && l.Transportation == TypeOfTransportation.Urban).ToList();
            List<Line> lines = new List<Line>();
            timeTables.ForEach(t => lines.Add(t.Line));
            return lines;

        }

        [Route("api/TimeTables/GetTimeTablesSuburban")]
        public IEnumerable<Line> GetTimeTablesSuburban()
        {
            List<TimeTable> timeTables = db.TimeTables.Where(l => l.Line.Stations.Where(s => s.Name != null).FirstOrDefault() != null && l.Transportation == TypeOfTransportation.Suburban).ToList();
            List<Line> lines = new List<Line>();
            timeTables.ForEach(t => lines.Add(t.Line));
            return lines;
        }


        // GET: api/TimeTables/5
        [ResponseType(typeof(TimeTable))]
        public IHttpActionResult GetTimeTable(int id)
        {
            TimeTable timeTable = db.TimeTables.Find(id);
            if (timeTable == null)
            {
                return NotFound();
            }

            return Ok(timeTable);
        }

        // PUT: api/TimeTables/5
        [ResponseType(typeof(void))]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult PutTimeTable(int id, TimeTable timeTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != timeTable.Id)
            {
                return BadRequest();
            }

            db.Entry(timeTable).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimeTableExists(id))
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

        // POST: api/TimeTables
        [ResponseType(typeof(TimeTable))]
        [Authorize(Roles ="Admin")]
        public IHttpActionResult PostTimeTable(TimeTableBindingModel model)
        {
            Line line = db.Lines.Where(l => l.LineNumber == model.LineNumber).FirstOrDefault();
            TimeTable timeTable = new TimeTable();
            timeTable.Day = model.DayType;
            timeTable.Transportation = model.TransportationType;
            if (line == null)
            {
                Line newLine = new Line();
                newLine.LineNumber = model.LineNumber;

                db.Lines.Add(newLine);
                timeTable.Line = newLine;
                db.TimeTables.Add(timeTable);
                //db.Entry(timeTable).State = EntityState.Modified;
                db.SaveChanges();
                return Ok();


            }
            timeTable.Line = line;
            db.TimeTables.Add(timeTable);
            //db.Entry(timeTable).State = EntityState.Modified;
            db.SaveChanges();
            return Ok();

           



        
        
        }

        [HttpPost]
        [Route("api/TimeTables/PostDeparture")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult PostDeparture(DepartureModel model)
        {
            TimeTable timeTable = db.TimeTables.Where(t => t.Id == model.TimeT).FirstOrDefault();
            Departure departure = new Departure();
            departure.DepartureTime = model.DepartureDate + model.Time;
            timeTable.Departures.Add(departure);
            db.Entry(timeTable).State = EntityState.Modified;
            db.SaveChanges();
            return Ok();
        }

        // DELETE: api/TimeTables/5
        [ResponseType(typeof(TimeTable))]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult DeleteTimeTable(int id)
        {
            TimeTable timeTable = db.TimeTables.Find(id);
            if (timeTable == null)
            {
                return NotFound();
            }

            db.TimeTables.Remove(timeTable);
            db.SaveChanges();

            return Ok(timeTable);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TimeTableExists(int id)
        {
            return db.TimeTables.Count(e => e.Id == id) > 0;
        }
    }
}