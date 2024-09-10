using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class capnhatKhCTGG : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "giaGiam",
                table: "KhoaHoc",
                type: "real",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ChiTietGiamGia",
                columns: table => new
                {
                    maGg = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    maKh = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    ngayBatDau = table.Column<DateTime>(type: "date", nullable: false),
                    ngayKetThuc = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietGiamGia", x => new { x.maKh, x.maGg });
                    table.ForeignKey(
                        name: "FK_chiTietGiamGia_GiamGia",
                        column: x => x.maGg,
                        principalTable: "GiamGia",
                        principalColumn: "maGg",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChiTietGiamGia_KhoaHoc_maKh",
                        column: x => x.maKh,
                        principalTable: "KhoaHoc",
                        principalColumn: "maKh",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietGiamGia_maGg",
                table: "ChiTietGiamGia",
                column: "maGg");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChiTietGiamGia");

            migrationBuilder.DropColumn(
                name: "giaGiam",
                table: "KhoaHoc");
        }
    }
}
