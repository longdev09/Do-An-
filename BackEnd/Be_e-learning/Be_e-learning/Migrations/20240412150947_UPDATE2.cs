using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class UPDATE2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Noidung_LoaiNoiDung",
                table: "NoiDung");

            migrationBuilder.CreateIndex(
                name: "IX_NoiDung_maLoaiNd",
                table: "NoiDung",
                column: "maLoaiNd");

            migrationBuilder.AddForeignKey(
                name: "FK_Noidung_LoaiNoiDung",
                table: "NoiDung",
                column: "maLoaiNd",
                principalTable: "LoaiNoiDung",
                principalColumn: "maLoaiNd",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Noidung_LoaiNoiDung",
                table: "NoiDung");

            migrationBuilder.DropIndex(
                name: "IX_NoiDung_maLoaiNd",
                table: "NoiDung");

            migrationBuilder.AddForeignKey(
                name: "FK_Noidung_LoaiNoiDung",
                table: "NoiDung",
                column: "maCh",
                principalTable: "LoaiNoiDung",
                principalColumn: "maLoaiNd",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
