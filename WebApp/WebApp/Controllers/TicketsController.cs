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
    public class TicketsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        private readonly IUnitOfWork unitOfWork;

        public TicketsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Tickets
        public IEnumerable<Ticket> GetTickets()
        {
            return unitOfWork.Tickets.GetAll();
        }

        // GET: api/Tickets/5
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult GetTicket(int id)
        {
            Ticket ticket = db.Tickets.Find(id);
            if (ticket == null)
            {
                return NotFound();
            }

            return Ok(ticket);
        }
        [HttpPost]
        [Route("api/Tickets/GetTicketPrice")]
        public IHttpActionResult GetTicketPrice(TicketPriceModel model)
        {
            var pricelist = db.Pricelists.First();
            double totalPrice = pricelist.StartingPrice;
            if (model.TransportationType == TypeOfTransportation.Urban)
            {
                totalPrice *= pricelist.UrbanMultiplicator;
            }
            else
            {
                totalPrice *= pricelist.SuburbanMultiplicator;
            }

            switch (model.TicketType)
            {
                case TypeOfTicket.Hourly:
                    totalPrice *= pricelist.HourlyTicketMultiplicator;
                    break;
                case TypeOfTicket.Daily:
                    totalPrice *= pricelist.DailyTicketMultiplicator;
                    break;
                case TypeOfTicket.Monthly:
                    totalPrice *= pricelist.MonthlyTicketMultiplicator;
                    break;
                case TypeOfTicket.Yearly:
                    totalPrice *= pricelist.YearlyTicketMultiplicator;
                    break;


            }

            switch (model.PassangerType)
            {
                case TypeOfPassanger.Ordinary:
                    totalPrice *= pricelist.RegularMultiplicator;
                    break;
                case TypeOfPassanger.Student:
                    totalPrice *= pricelist.StudentMultiplicator;
                    break;
                case TypeOfPassanger.Pensioner:
                    totalPrice *= pricelist.PensionerMultiplicator;
                    break;
            }

            return Ok(totalPrice);
        }

        [HttpPost]
        [Route("api/Tickets/BuyTicket")]
        public IHttpActionResult BuyTicket(BuyTicketModel model)
        {
            var username = User.Identity.Name;
            var user = db.Users.Where(u => u.UserName == username).Include(u1 => u1.User).First();
            var appuser = user.User as Passanger;
            Ticket t = new Ticket();
            t.PassangerType = appuser.PassangerType;
            t.Price = model.Price;
            t.TicketType = model.TicketType;
            t.DateOfIssue = DateTime.Now;

            switch (t.TicketType)
            {
                case TypeOfTicket.Hourly:
                    t.ExpireDate =t.DateOfIssue.AddHours(1);
                    break;
                case TypeOfTicket.Daily:
                    int year = t.DateOfIssue.Year;
                    int month = t.DateOfIssue.Month;
                    int day = t.DateOfIssue.Day;

                    t.ExpireDate = new DateTime(year, month, day, 23, 59, 59);
                    break;
                case TypeOfTicket.Monthly:
                    year = t.DateOfIssue.Year;
                    month = t.DateOfIssue.Month;
                    day = DateTime.DaysInMonth(year, month);
                    t.ExpireDate = new DateTime(year, month, day, 23, 59, 59);
                    break;
                case TypeOfTicket.Yearly:
                    year = t.DateOfIssue.Year;
                    
                   
                    t.ExpireDate = new DateTime(year, 12,31 , 23, 59, 59);
                    break;



            }
            db.Tickets.Add(t);
            appuser.PassangerTicket = t;
            user.User = appuser;
            db.Users.Attach(user);
            db.Entry(user).State = EntityState.Modified;
            db.SaveChanges();

            return Ok(t.ExpireDate);
        }


        // PUT: api/Tickets/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTicket(int id, Ticket ticket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ticket.Id)
            {
                return BadRequest();
            }

            db.Entry(ticket).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
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

        // POST: api/Tickets
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult PostTicket(Ticket ticket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Tickets.Add(ticket);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = ticket.Id }, ticket);
        }

        // DELETE: api/Tickets/5
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult DeleteTicket(int id)
        {
            Ticket ticket = db.Tickets.Find(id);
            if (ticket == null)
            {
                return NotFound();
            }

            db.Tickets.Remove(ticket);
            db.SaveChanges();

            return Ok(ticket);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TicketExists(int id)
        {
            return db.Tickets.Count(e => e.Id == id) > 0;
        }
    }
}