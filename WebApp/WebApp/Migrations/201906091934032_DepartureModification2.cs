namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DepartureModification2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Departures", "TimeTable_Id", "dbo.TimeTables");
            DropIndex("dbo.Departures", new[] { "TimeTable_Id" });
            RenameColumn(table: "dbo.Departures", name: "TimeTable_Id", newName: "TimeTableId");
            AlterColumn("dbo.Departures", "TimeTableId", c => c.Int(nullable: false));
            CreateIndex("dbo.Departures", "TimeTableId");
            AddForeignKey("dbo.Departures", "TimeTableId", "dbo.TimeTables", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Departures", "TimeTableId", "dbo.TimeTables");
            DropIndex("dbo.Departures", new[] { "TimeTableId" });
            AlterColumn("dbo.Departures", "TimeTableId", c => c.Int());
            RenameColumn(table: "dbo.Departures", name: "TimeTableId", newName: "TimeTable_Id");
            CreateIndex("dbo.Departures", "TimeTable_Id");
            AddForeignKey("dbo.Departures", "TimeTable_Id", "dbo.TimeTables", "Id");
        }
    }
}
