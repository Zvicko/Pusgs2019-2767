namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class proba : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Fullname = c.String(),
                        UserName = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.AspNetUsers", "UserId", c => c.Int(nullable: false));
            CreateIndex("dbo.AspNetUsers", "UserId");
            AddForeignKey("dbo.AspNetUsers", "UserId", "dbo.Users", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUsers", "UserId", "dbo.Users");
            DropIndex("dbo.AspNetUsers", new[] { "UserId" });
            DropColumn("dbo.AspNetUsers", "UserId");
            DropTable("dbo.Users");
        }
    }
}
