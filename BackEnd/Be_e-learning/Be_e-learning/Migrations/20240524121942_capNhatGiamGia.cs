using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class capNhatGiamGia : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GiamGia",
                columns: table => new
                {
                    maGg = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    phanTramGiam = table.Column<float>(type: "real", nullable: true),
                    maGv = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiamGia", x => x.maGg);
                    table.ForeignKey(
                        name: "FK_GiamGia_GiangVien",
                        column: x => x.maGv,
                        principalTable: "GiangVien",
                        principalColumn: "maGv",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GiamGia_maGv",
                table: "GiamGia",
                column: "maGv");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GiamGia");
        }
    }
}
