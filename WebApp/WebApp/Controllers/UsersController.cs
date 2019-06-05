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
    public class UsersController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        private readonly IUnitOfWork unitOfWork;

        public UsersController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Users
        public IEnumerable<AppUser> GetUsers()
        {
            return unitOfWork.AppUsers.GetAll();
        }

        [Route("api/Users/GetCurrentUser")]
        [HttpGet]
        public IHttpActionResult GetCurrentUser()
        {
            try
            {
                var username = User.Identity.Name;
                var user = db.Users.Where(u => u.UserName == username).Include(u1 => u1.User).First();
                var appUser = user.User;
                return Ok(appUser);
            }
            catch
            {
                return Ok();
            }
        }

        // GET: api/Users/5
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult GetUser(int id)
        {
            AppUser user = db.AppUsers.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, AppUser user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult PostUser(AppUser user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AppUsers.Add(user);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult DeleteUser(int id)
        {
            AppUser user = db.AppUsers.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.AppUsers.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.AppUsers.Count(e => e.Id == id) > 0;
        }
    }
}