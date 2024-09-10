using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class cnnn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TracNghiem_maNd",
                table: "TracNghiem");

            migrationBuilder.CreateIndex(
                name: "IX_TracNghiem_maNd",
                table: "TracNghiem",
                column: "maNd",
                unique: true,
                filter: "[maNd] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TracNghiem_maNd",
                table: "TracNghiem");

            migrationBuilder.CreateIndex(
                name: "IX_TracNghiem_maNd",
                table: "TracNghiem",
                column: "maNd");
        }
    }
}
