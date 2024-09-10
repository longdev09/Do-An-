using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class capNhatCtgh : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_chiTietGioHang_khoaHoc",
                table: "ChiTietGioHang");

            migrationBuilder.RenameColumn(
                name: "MaKh",
                table: "ChiTietGioHang",
                newName: "maKh");

            migrationBuilder.AddForeignKey(
                name: "FK_chiTietGioHang_khoaHoc",
                table: "ChiTietGioHang",
                column: "maKh",
                principalTable: "KhoaHoc",
                principalColumn: "maKh",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_chiTietGioHang_khoaHoc",
                table: "ChiTietGioHang");

            migrationBuilder.RenameColumn(
                name: "maKh",
                table: "ChiTietGioHang",
                newName: "MaKh");

            migrationBuilder.AddForeignKey(
                name: "FK_chiTietGioHang_khoaHoc",
                table: "ChiTietGioHang",
                column: "maGh",
                principalTable: "KhoaHoc",
                principalColumn: "maKh",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
