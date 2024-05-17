using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SumplemetShop.Server.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Proteins",
                columns: table => new
                {
                    ProteinId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProteinName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProteinDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProteinType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProteinPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Proteinflavour = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: true),
                    Available = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proteins", x => x.ProteinId);
                });

            migrationBuilder.CreateTable(
                name: "proteinTypes",
                columns: table => new
                {
                    ProteinTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProteinTypeName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_proteinTypes", x => x.ProteinTypeId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Proteins");

            migrationBuilder.DropTable(
                name: "proteinTypes");
        }
    }
}
