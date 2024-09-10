using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class capNhatKhDaMua : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KhoaHocDaMuas_KhoaHoc",
                table: "KhoaHocDaMua");

            migrationBuilder.AddForeignKey(
                name: "FK_KhoaHocDaMuas_KhoaHoc",
                table: "KhoaHocDaMua",
                column: "maHv",
                principalTable: "HocVien",
                principalColumn: "maHv",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KhoaHocDaMuas_KhoaHoc",
                table: "KhoaHocDaMua");

            migrationBuilder.AddForeignKey(
                name: "FK_KhoaHocDaMuas_KhoaHoc",
                table: "KhoaHocDaMua",
                column: "maKh",
                principalTable: "HocVien",
                principalColumn: "maHv",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
