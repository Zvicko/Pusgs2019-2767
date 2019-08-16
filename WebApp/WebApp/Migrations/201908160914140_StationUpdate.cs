namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class StationUpdate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Stations", "Address", c => c.String());
            DropColumn("dbo.Stations", "Adress");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Stations", "Adress", c => c.String());
            DropColumn("dbo.Stations", "Address");
        }
    }
}
