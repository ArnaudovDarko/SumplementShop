using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SumplemetShop.Server.Migrations
{
    public partial class ChangingNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Proteinflavour",
                table: "Proteins",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "ProteinType",
                table: "Proteins",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "ProteinPrice",
                table: "Proteins",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "ProteinName",
                table: "Proteins",
                newName: "Flavour");

            migrationBuilder.RenameColumn(
                name: "ProteinDescription",
                table: "Proteins",
                newName: "Description");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Proteins",
                newName: "Proteinflavour");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Proteins",
                newName: "ProteinPrice");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Proteins",
                newName: "ProteinType");

            migrationBuilder.RenameColumn(
                name: "Flavour",
                table: "Proteins",
                newName: "ProteinName");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Proteins",
                newName: "ProteinDescription");
        }
    }
}
