namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DeparturesCreated : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Departures",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DepartureTime = c.DateTime(nullable: false),
                        TimeTable_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TimeTables", t => t.TimeTable_Id)
                .Index(t => t.TimeTable_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Departures", "TimeTable_Id", "dbo.TimeTables");
            DropIndex("dbo.Departures", new[] { "TimeTable_Id" });
            DropTable("dbo.Departures");
        }
    }
}
