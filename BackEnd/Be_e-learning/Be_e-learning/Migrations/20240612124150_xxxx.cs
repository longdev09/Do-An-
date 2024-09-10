using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class xxxx : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LichSuThanhToan",
                columns: table => new
                {
                    maLs = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    donGiaRut = table.Column<float>(type: "real", nullable: true),
                    ngayRut = table.Column<DateTime>(type: "date", nullable: false),
                    ngayThanhToan = table.Column<DateTime>(type: "date", nullable: false),
                    trangThai = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    maGv = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LichSuThanhToan", x => x.maLs);
                    table.ForeignKey(
                        name: "FK_lichSuThanhToans_GiangVien",
                        column: x => x.maGv,
                        principalTable: "GiangVien",
                        principalColumn: "maGv",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LoiNhuanGiangVien",
                columns: table => new
                {
                    maLoiNhuan = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    maGv = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    tongLoiNhuan = table.Column<float>(type: "real", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoiNhuanGiangVien", x => x.maLoiNhuan);
                    table.ForeignKey(
                        name: "FK_LoiNhuanGiangVien_giangVien",
                        column: x => x.maGv,
                        principalTable: "GiangVien",
                        principalColumn: "maGv",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LichSuThanhToan_maGv",
                table: "LichSuThanhToan",
                column: "maGv");

            migrationBuilder.CreateIndex(
                name: "IX_LoiNhuanGiangVien_maGv",
                table: "LoiNhuanGiangVien",
                column: "maGv",
                unique: true,
                filter: "[maGv] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LichSuThanhToan");

            migrationBuilder.DropTable(
                name: "LoiNhuanGiangVien");
        }
    }
}
