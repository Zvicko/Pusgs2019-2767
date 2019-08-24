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
using System.Net.Mail;

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
            imageName = imageName + appuser.Id + Path.GetExtension(postedFile.FileName);
            var filePath = HttpContext.Current.Server.MapPath("~/Photos/" + imageName);
            postedFile.SaveAs(filePath);
            appuser.PhotoPath = imageName;
            if (appuser.Verified == VerificationStatus.NotAccepted)
                appuser.Verified = VerificationStatus.Inprocess;
            else if (appuser.Verified == VerificationStatus.Accepted)
                appuser.Verified = VerificationStatus.Accepted;
            else
                appuser.Verified = VerificationStatus.Inprocess;

            user.User = appuser;
            db.Users.Attach(user);
            db.Entry(user).State = EntityState.Modified;
            db.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.Created);
        }

        [HttpGet]
        [Route("GetPhoto")]
        public HttpResponseMessage GetPhoto(string imagePath)
        {
            if(imagePath == null)
            {
                imagePath = "Default.gif";
            }

            var filePath = HttpContext.Current.Server.MapPath("~/Photos/" + imagePath);
            var ext = System.IO.Path.GetExtension(filePath);
            var contents = System.IO.File.ReadAllBytes(filePath);

            System.IO.MemoryStream ms = new System.IO.MemoryStream(contents);

            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StreamContent(ms);
            response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("Photos/" + ext);

            return response;


        }


        [HttpGet]
        [Route("GetAllUnverified")]
        public IEnumerable<Passanger> GetAllUnverifiedUsers()
        {
            List<Passanger> passangers = db.AppUsers.Where(u => u.UserType == TypeOfUser.Passanger).OfType<Passanger>().ToList();
            return passangers.Where(p => p.Verified == VerificationStatus.Inprocess).ToList();

           
           

        }

        [HttpGet]
        [Route("GetAllVerified")]
        public IEnumerable<Passanger> GetAllVerifiedUsers()
        {
            List<Passanger> passangers = db.AppUsers.Where(u => u.UserType == TypeOfUser.Passanger).OfType<Passanger>().ToList();
            return passangers.Where(p => p.Verified == VerificationStatus.Accepted && p.PassangerTicket != null).ToList();




        }


        [HttpPut]
        [Route("VerifyUser")]
        public IHttpActionResult VerifyUser(VerifyUserModel model)
        {
            

            var user = db.Users.Where(u => u.UserId == model.Id).Include(u1 => u1.User).First();
            var pass = user.User as Passanger;
            if (model.IsAccepted)
            {
                pass.Verified = VerificationStatus.Accepted;
                MailMessage mail = new MailMessage("cyborg.cimidad@gmail.com", "cyborg.cimidad@gmail.com");
                SmtpClient client = new SmtpClient();
                client.Port = 587;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential("cyborg.cimidad@gmail.com", "zvickocar");
                client.Host = "smtp.gmail.com";
                client.EnableSsl = true;
                mail.From = new MailAddress("cyborg.cimidad@gmail.com");
                mail.To.Add("cyborg.cimidad@gmail.com");
                mail.Subject = "Verifikacija naloga";
                mail.Body = $"Postovani {pass.FullName} Vas nalog je upravo verifikovan.";
                client.Send(mail);
            }
            else
            {
                pass.Verified = VerificationStatus.NotAccepted;
                MailMessage mail = new MailMessage("cyborg.cimidad@gmail.com", "cyborg.cimidad@gmail.com");
                SmtpClient client = new SmtpClient();
                client.Port = 587;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential("cyborg.cimidad@gmail.com", "zvickocar");
                client.Host = "smtp.gmail.com";
                client.EnableSsl = true;
                mail.From = new MailAddress("cyborg.cimidad@gmail.com");
                mail.To.Add("cyborg.cimidad@gmail.com");
                mail.Subject = "Verifikacija naloga";
                mail.Body = $"Postovani {pass.FullName} verifikacija Vaseg naloga je odbijena. Razlog {model.Reason}";
                client.Send(mail);
            }
                
           
            user.User = pass;
            db.Users.Attach(user);
            db.Entry(user).State = EntityState.Modified;
            db.SaveChanges();




            


            return Ok();
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