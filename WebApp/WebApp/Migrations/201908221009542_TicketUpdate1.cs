namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TicketUpdate1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tickets", "VerifiedByController", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Tickets", "VerifiedByController");
        }
    }
}
