namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Pricelist_modification : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Tickets", "Pricelist_Id", "dbo.Pricelists");
            DropIndex("dbo.Tickets", new[] { "Pricelist_Id" });
            AddColumn("dbo.Pricelists", "StartingPrice", c => c.Double(nullable: false));
            AddColumn("dbo.Pricelists", "StudentMultiplicator", c => c.Double(nullable: false));
            AddColumn("dbo.Pricelists", "RegularMultiplicator", c => c.Double(nullable: false));
            AddColumn("dbo.Pricelists", "PensionerMultiplicator", c => c.Double(nullable: false));
            AddColumn("dbo.Pricelists", "UrbanMultiplicator", c => c.Double(nullable: false));
            AddColumn("dbo.Pricelists", "SuburbanMultipilicator", c => c.Double(nullable: false));
            AddColumn("dbo.Pricelists", "HourlyTicketMultiplicator", c => c.Double(nullable: false));
            AddColumn("dbo.Pricelists", "DailyTicketMultiplicator", c => c.Double(nullable: false));
            AddColumn("dbo.Pricelists", "MonthlyTicketMultiplicator", c => c.Double(nullable: false));
            AddColumn("dbo.Pricelists", "YearlyTicketMultiplicator", c => c.Double(nullable: false));
            AddColumn("dbo.Pricelists", "TotalPrice", c => c.Double(nullable: false));
            DropColumn("dbo.Tickets", "Pricelist_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Tickets", "Pricelist_Id", c => c.Int());
            DropColumn("dbo.Pricelists", "TotalPrice");
            DropColumn("dbo.Pricelists", "YearlyTicketMultiplicator");
            DropColumn("dbo.Pricelists", "MonthlyTicketMultiplicator");
            DropColumn("dbo.Pricelists", "DailyTicketMultiplicator");
            DropColumn("dbo.Pricelists", "HourlyTicketMultiplicator");
            DropColumn("dbo.Pricelists", "SuburbanMultipilicator");
            DropColumn("dbo.Pricelists", "UrbanMultiplicator");
            DropColumn("dbo.Pricelists", "PensionerMultiplicator");
            DropColumn("dbo.Pricelists", "RegularMultiplicator");
            DropColumn("dbo.Pricelists", "StudentMultiplicator");
            DropColumn("dbo.Pricelists", "StartingPrice");
            CreateIndex("dbo.Tickets", "Pricelist_Id");
            AddForeignKey("dbo.Tickets", "Pricelist_Id", "dbo.Pricelists", "Id");
        }
    }
}
