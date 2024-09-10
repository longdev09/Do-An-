using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class hdCthd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HoaDon",
                columns: table => new
                {
                    maHd = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    maHv = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    tongTien = table.Column<float>(type: "real", nullable: true),
                    ngayThanhToan = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoaDon", x => x.maHd);
                    table.ForeignKey(
                        name: "FK_HoaDon_HocVien",
                        column: x => x.maHd,
                        principalTable: "HocVien",
                        principalColumn: "maHv",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChiTietHoaDon",
                columns: table => new
                {
                    maKh = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    maHd = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    donGia = table.Column<float>(type: "real", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietHoaDon", x => x.maKh);
                    table.ForeignKey(
                        name: "FK_ChiTietHoaDons_HoaDon",
                        column: x => x.maHd,
                        principalTable: "HoaDon",
                        principalColumn: "maHd",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChiTietHoaDons_KhoaHoc",
                        column: x => x.maKh,
                        principalTable: "KhoaHoc",
                        principalColumn: "maKh",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietHoaDon_maHd",
                table: "ChiTietHoaDon",
                column: "maHd");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChiTietHoaDon");

            migrationBuilder.DropTable(
                name: "HoaDon");
        }
    }
}
