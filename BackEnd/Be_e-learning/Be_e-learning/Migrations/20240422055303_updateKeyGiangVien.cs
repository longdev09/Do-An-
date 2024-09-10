using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class updateKeyGiangVien : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_GiangVien_maNg",
                table: "GiangVien");

            migrationBuilder.CreateIndex(
                name: "IX_GiangVien_maNg",
                table: "GiangVien",
                column: "maNg",
                unique: true,
                filter: "[maNg] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_GiangVien_maNg",
                table: "GiangVien");

            migrationBuilder.CreateIndex(
                name: "IX_GiangVien_maNg",
                table: "GiangVien",
                column: "maNg");
        }
    }
}
