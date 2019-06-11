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

namespace WebApp.Controllers
{
    public class TimeTablesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/TimeTables
        public IQueryable<TimeTable> GetTimeTables()
        {
            return db.TimeTables;
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

        // DELETE: api/TimeTables/5
        [ResponseType(typeof(TimeTable))]
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