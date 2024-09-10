using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class xoa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HoaDonBanKh_KhoaHoc",
                table: "HoaDonBanKh");

            migrationBuilder.DropIndex(
                name: "IX_HoaDonBanKh_maKh",
                table: "HoaDonBanKh");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_HoaDonBanKh_maKh",
                table: "HoaDonBanKh",
                column: "maKh");

            migrationBuilder.AddForeignKey(
                name: "FK_HoaDonBanKh_KhoaHoc",
                table: "HoaDonBanKh",
                column: "maKh",
                principalTable: "KhoaHoc",
                principalColumn: "maKh",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
