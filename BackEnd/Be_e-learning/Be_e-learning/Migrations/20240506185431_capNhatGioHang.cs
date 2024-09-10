using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class capNhatGioHang : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_gioHang_hocVien",
                table: "GioHang");

            migrationBuilder.CreateIndex(
                name: "IX_GioHang_maHv",
                table: "GioHang",
                column: "maHv",
                unique: true,
                filter: "[maHv] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_gioHang_hocVien",
                table: "GioHang",
                column: "maHv",
                principalTable: "HocVien",
                principalColumn: "maHv",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_gioHang_hocVien",
                table: "GioHang");

            migrationBuilder.DropIndex(
                name: "IX_GioHang_maHv",
                table: "GioHang");

            migrationBuilder.AddForeignKey(
                name: "FK_gioHang_hocVien",
                table: "GioHang",
                column: "maGh",
                principalTable: "HocVien",
                principalColumn: "maHv",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
