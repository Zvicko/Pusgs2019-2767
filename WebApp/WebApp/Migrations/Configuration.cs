namespace WebApp.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Validation;
    using System.Linq;
    using System.Text;
    using WebApp.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<WebApp.Persistence.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(WebApp.Persistence.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Admin" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "Controller"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Controller" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "AppUser"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "AppUser" };

                manager.Create(role);
            }
            context.AppUsers.AddOrUpdate(

                 u => u.FullName,

                 new AppUser() { FullName = "Admin Adminovic" }

           );
            context.AppUsers.AddOrUpdate(
                
                u => u.FullName,
                new Administrator() { FullName="Admin Admincic",BirthDay = DateTime.Parse("07/07/1994")}
                
           );

            context.AppUsers.AddOrUpdate(

               u => u.FullName,
               new Controller() { FullName = "Kontrolor  Kontrolovic", BirthDay = DateTime.Parse("10/11/1999") }
          );

            context.AppUsers.AddOrUpdate(
                
                u => u.FullName,
                new Passanger() { FullName = "Putnik Putnikovic",BirthDay = DateTime.Parse("10/11/1999"), PassangerType = TypeOfPassanger.Student}
           );

            context.AppUsers.AddOrUpdate(

                p => p.FullName,

                new AppUser() { FullName = "AppUser AppUserovic", BirthDay = DateTime.Parse("07/01/1991") }

            );

            context.Pricelists.AddOrUpdate(
             p => p.Id,
             new Pricelist() { StartingPrice = 0, StudentMultiplicator = 0, PensionerMultiplicator = 0, DailyTicketMultiplicator = 0, HourlyTicketMultiplicator = 0, MonthlyTicketMultiplicator = 0, RegularMultiplicator = 0, SuburbanMultipilicator = 0, TotalPrice = 0, UrbanMultiplicator = 0, YearlyTicketMultiplicator = 0 }
             );
            SaveChanges(context);
           
            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            if (!context.Users.Any(u => u.UserName == "zdravko@admin.com"))
            {

                var _appUser = context.AppUsers.FirstOrDefault(a => a.FullName == "Zdravko Zdravkovic");
                var user = new ApplicationUser() { Id = "ZdravkoAdmin", UserName = "zdravko@admin.com", Email = "zdravko@admin.com", PasswordHash = ApplicationUser.HashPassword("Zdravko94!"), UserId = _appUser.Id, User = _appUser };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Admin");
            }

                if (!context.Users.Any(u => u.UserName == "admin@yahoo.com"))
            {
                var user = new ApplicationUser() { Id = "admin", UserName = "admin@yahoo.com", Email = "admin@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Admin123!") };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Admin");
            }

            if (!context.Users.Any(u => u.UserName == "appu@yahoo.com"))
            { 
                var user = new ApplicationUser() { Id = "appu", UserName = "appu@yahoo", Email = "appu@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Appu123!") };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "AppUser");
            }
        }
        private static void SaveChanges(DbContext context)
        {
            try
            {
                context.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                var sb = new StringBuilder();
                foreach (var failure in ex.EntityValidationErrors)
                {
                    sb.AppendFormat("{0} failed validation\n", failure.Entry.Entity.GetType());
                    foreach (var error in failure.ValidationErrors)
                    {
                        sb.AppendFormat("- {0} : {1}", error.PropertyName, error.ErrorMessage);
                        sb.AppendLine();
                    }
                }
                throw new DbEntityValidationException(
                    "Entity Validation Failed - errors follow:\n" +
                    sb.ToString(), ex
                );
            }
        }
    }
}
