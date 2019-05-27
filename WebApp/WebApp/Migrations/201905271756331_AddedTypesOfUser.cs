namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedTypesOfUser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "UserType", c => c.Int(nullable: false));
            AddColumn("dbo.Users", "PassangerType", c => c.Int());
            AddColumn("dbo.Users", "Verified", c => c.Boolean());
            AddColumn("dbo.Users", "PhotoPath", c => c.String());
            AddColumn("dbo.Users", "Discriminator", c => c.String(nullable: false, maxLength: 128));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "Discriminator");
            DropColumn("dbo.Users", "PhotoPath");
            DropColumn("dbo.Users", "Verified");
            DropColumn("dbo.Users", "PassangerType");
            DropColumn("dbo.Users", "UserType");
        }
    }
}
