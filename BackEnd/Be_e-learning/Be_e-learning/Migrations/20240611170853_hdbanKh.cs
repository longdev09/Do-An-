using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class hdbanKh : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HoaDonBanKh",
                columns: table => new
                {
                    maHdKhMua = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    maGv = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    maKh = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    donGia = table.Column<float>(type: "real", nullable: true),
                    ngayMua = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoaDonBanKh", x => x.maHdKhMua);
                    table.ForeignKey(
                        name: "FK_HoaDonBanKh_GiangVien",
                        column: x => x.maGv,
                        principalTable: "GiangVien",
                        principalColumn: "maGv",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HoaDonBanKh_maGv",
                table: "HoaDonBanKh",
                column: "maGv");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HoaDonBanKh");
        }
    }
}
