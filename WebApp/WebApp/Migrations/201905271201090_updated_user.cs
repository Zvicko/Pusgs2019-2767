namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updated_user : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Email", c => c.String());
            AddColumn("dbo.Users", "BirthDay", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "BirthDay");
            DropColumn("dbo.Users", "Email");
        }
    }
}
