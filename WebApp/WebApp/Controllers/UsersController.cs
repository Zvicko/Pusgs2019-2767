using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.IO;
using Microsoft.AspNet.Identity;
using System.Collections;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Users")]
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
            return unitOfWork.Users.GetAll();
        }

        [Route("GetCurrentUser")]
        [HttpGet]
        [ResponseType(typeof(AppUser))]
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
        [HttpPost]
        [Route("EditUser")]
        public HttpResponseMessage EditUser(EditUserBindingModel editUser)
        {


            try
            {
                var username = User.Identity.Name;
                var user = db.Users.Where(u => u.UserName == username).Include(u1 => u1.User).First();
                var appuser = user.User as Passanger;
                appuser.FullName = editUser.FullName;
                appuser.PassangerType = editUser.PassangerType;
                appuser.Email = editUser.Email;
                appuser.BirthDay = editUser.BirthDay;
                user.User = appuser;
                db.Users.Attach(user);
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
        [HttpPost]
        [Route("UploadPhoto")]
        public HttpResponseMessage UploadPhoto()
        {
            var httpRequest = HttpContext.Current.Request;
            var username = User.Identity.Name;
            var postedFile = httpRequest.Files["Photo"];


            string imageName = new string(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");


            var user = db.Users.Where(u => u.UserName == username).Include(u1 => u1.User).First();
            var appuser = user.User as Passanger;
            imageName = imageName + appuser.FullName + Path.GetExtension(postedFile.FileName);
            var filePath = HttpContext.Current.Server.MapPath("~/Photos/" + imageName);
            postedFile.SaveAs(filePath);
            appuser.PhotoPath = imageName;
            user.User = appuser;
            db.Users.Attach(user);
            db.Entry(user).State = EntityState.Modified;
            db.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.Created);
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