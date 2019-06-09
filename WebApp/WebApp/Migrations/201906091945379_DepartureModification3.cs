namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DepartureModification3 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Departures", "TimeTableId", "dbo.TimeTables");
            DropIndex("dbo.Departures", new[] { "TimeTableId" });
            RenameColumn(table: "dbo.Departures", name: "TimeTableId", newName: "TimeTable_Id");
            AlterColumn("dbo.Departures", "TimeTable_Id", c => c.Int());
            CreateIndex("dbo.Departures", "TimeTable_Id");
            AddForeignKey("dbo.Departures", "TimeTable_Id", "dbo.TimeTables", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Departures", "TimeTable_Id", "dbo.TimeTables");
            DropIndex("dbo.Departures", new[] { "TimeTable_Id" });
            AlterColumn("dbo.Departures", "TimeTable_Id", c => c.Int(nullable: false));
            RenameColumn(table: "dbo.Departures", name: "TimeTable_Id", newName: "TimeTableId");
            CreateIndex("dbo.Departures", "TimeTableId");
            AddForeignKey("dbo.Departures", "TimeTableId", "dbo.TimeTables", "Id", cascadeDelete: true);
        }
    }
}
