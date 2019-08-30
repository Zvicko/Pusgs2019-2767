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
using WebApp.Hubs;
using WebApp.Models;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class LinesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        private NotificationHub notificationHub;
        public IUnitOfWork UnitOfWork { get; set; }

        public LinesController(IUnitOfWork unitOfWork, NotificationHub hub)
        {
            this.UnitOfWork = unitOfWork;
            this.notificationHub = hub;
        }

        // GET: api/Lines
        public IEnumerable<Line> GetLines()
        {
            return UnitOfWork.Lines.GetAll();
        }
        [Route("api/Lines/GetLinesWithStations")]
        public IEnumerable<Line> GetAllWithStations()
        {
            return db.Lines.Where(l => l.Stations.Where(s => s.Name != null).FirstOrDefault() != null).ToList();
        }

        // GET: api/Lines/5
        [ResponseType(typeof(Line))]
        public IHttpActionResult GetLine(int id)
        {
            Line line = db.Lines.Find(id);
            if (line == null)
            {
                return NotFound();
            }

            return Ok(line);
        }
        //[Route("api/Lines/GetLineHub/{id}")]
        //public IHttpActionResult GetLineHub(int id)
        //{
        //    Line line = db.Lines.Find(id);
        //    if (line == null)
        //    {
        //        return NotFound();
        //    }
        //    notificationHub.NotificationLine(line);
        //    return Ok(line);
        //}



        // PUT: api/Lines/5
        [ResponseType(typeof(void))]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult PutLine(int id, Line line)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != line.Id)
            {
                return BadRequest();
            }

            db.Entry(line).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LineExists(id))
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

        // POST: api/Lines
        [ResponseType(typeof(Line))]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult PostLine(Line line)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Lines.Add(line);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = line.Id }, line);
        }

        // DELETE: api/Lines/5
        [ResponseType(typeof(Line))]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult DeleteLine(int id)
        {
            Line line = db.Lines.Find(id);
            if (line == null)
            {
                return NotFound();
            }
            // ovaj deo sam dodao zbog izuzetka sa TimeTable
            TimeTable tt = db.TimeTables.Where(t => t.Line.Id == line.Id).FirstOrDefault();
            if (tt != null)
            {
                tt.Line = null;
                db.Entry(tt).State = EntityState.Modified;
                db.SaveChanges();
            }
                db.Lines.Remove(line);
                db.SaveChanges();
            
            return Ok(line);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LineExists(int id)
        {
            return db.Lines.Count(e => e.Id == id) > 0;
        }
    }
}