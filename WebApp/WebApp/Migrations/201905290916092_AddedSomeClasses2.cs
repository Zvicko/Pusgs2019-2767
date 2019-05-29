namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedSomeClasses2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Vehicles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Latitude = c.Double(nullable: false),
                        Longitude = c.Double(nullable: false),
                        Line_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.Line_Id)
                .Index(t => t.Line_Id);
            
            CreateTable(
                "dbo.Pricelists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Tickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Price = c.Double(nullable: false),
                        TicketType = c.Int(nullable: false),
                        PassangerType = c.Int(nullable: false),
                        Pricelist_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Pricelists", t => t.Pricelist_Id)
                .Index(t => t.Pricelist_Id);
            
            CreateTable(
                "dbo.TimeTables",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Day = c.Int(nullable: false),
                        Transportation = c.Int(nullable: false),
                        Line_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.Line_Id)
                .Index(t => t.Line_Id);
            
            AddColumn("dbo.Users", "PassangerTicket_Id", c => c.Int());
            CreateIndex("dbo.Users", "PassangerTicket_Id");
            AddForeignKey("dbo.Users", "PassangerTicket_Id", "dbo.Tickets", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Users", "PassangerTicket_Id", "dbo.Tickets");
            DropForeignKey("dbo.TimeTables", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.Tickets", "Pricelist_Id", "dbo.Pricelists");
            DropForeignKey("dbo.Vehicles", "Line_Id", "dbo.Lines");
            DropIndex("dbo.Users", new[] { "PassangerTicket_Id" });
            DropIndex("dbo.TimeTables", new[] { "Line_Id" });
            DropIndex("dbo.Tickets", new[] { "Pricelist_Id" });
            DropIndex("dbo.Vehicles", new[] { "Line_Id" });
            DropColumn("dbo.Users", "PassangerTicket_Id");
            DropTable("dbo.TimeTables");
            DropTable("dbo.Tickets");
            DropTable("dbo.Pricelists");
            DropTable("dbo.Vehicles");
        }
    }
}
