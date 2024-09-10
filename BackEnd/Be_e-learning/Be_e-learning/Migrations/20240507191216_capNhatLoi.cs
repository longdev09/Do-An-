using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class capNhatLoi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HoaDon_HocVien",
                table: "HoaDon");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDon_maHv",
                table: "HoaDon",
                column: "maHv");

            migrationBuilder.AddForeignKey(
                name: "FK_HoaDon_HocVien",
                table: "HoaDon",
                column: "maHv",
                principalTable: "HocVien",
                principalColumn: "maHv",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HoaDon_HocVien",
                table: "HoaDon");

            migrationBuilder.DropIndex(
                name: "IX_HoaDon_maHv",
                table: "HoaDon");

            migrationBuilder.AddForeignKey(
                name: "FK_HoaDon_HocVien",
                table: "HoaDon",
                column: "maHd",
                principalTable: "HocVien",
                principalColumn: "maHv",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
