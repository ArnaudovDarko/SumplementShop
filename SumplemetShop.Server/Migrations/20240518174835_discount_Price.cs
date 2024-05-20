using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SumplemetShop.Server.Migrations
{
    public partial class discount_Price : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "DiscountPrice",
                table: "Proteins",
                type: "decimal(18,2)",
                nullable: true,
                defaultValue: 0m);

            migrationBuilder.AddColumn<bool>(
                name: "OnDiscount",
                table: "Proteins",
                type: "bit",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiscountPrice",
                table: "Proteins");

            migrationBuilder.DropColumn(
                name: "OnDiscount",
                table: "Proteins");
        }
    }
}
