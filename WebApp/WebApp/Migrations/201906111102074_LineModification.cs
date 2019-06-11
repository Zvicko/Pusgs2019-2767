namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class LineModification : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Lines", "LineNumber", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Lines", "LineNumber");
        }
    }
}
