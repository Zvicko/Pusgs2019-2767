namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PassangerModification : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.AppUsers", "Verified", c => c.Int());
            DropColumn("dbo.AppUsers", "IsInProcess");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AppUsers", "IsInProcess", c => c.Boolean());
            AlterColumn("dbo.AppUsers", "Verified", c => c.Boolean());
        }
    }
}
