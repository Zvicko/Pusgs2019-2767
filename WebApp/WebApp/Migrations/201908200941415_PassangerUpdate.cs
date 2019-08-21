namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PassangerUpdate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AppUsers", "IsInProcess", c => c.Boolean());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AppUsers", "IsInProcess");
        }
    }
}
