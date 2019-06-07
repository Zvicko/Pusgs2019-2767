namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FixPricelist : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Pricelists", "SuburbanMultiplicator", c => c.Double(nullable: false));
            DropColumn("dbo.Pricelists", "SuburbanMultipilicator");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Pricelists", "SuburbanMultipilicator", c => c.Double(nullable: false));
            DropColumn("dbo.Pricelists", "SuburbanMultiplicator");
        }
    }
}
