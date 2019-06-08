namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TicketUpdate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tickets", "DateOfIssue", c => c.DateTime(nullable: false));
            AddColumn("dbo.Tickets", "ExpireDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Tickets", "ExpireDate");
            DropColumn("dbo.Tickets", "DateOfIssue");
        }
    }
}
