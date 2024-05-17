using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SumplemetShop.Server.Migrations
{
    public partial class Photo_Url : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "photoUrl",
                table: "Proteins",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "photoUrl",
                table: "Proteins");
        }
    }
}
