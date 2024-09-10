using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class capNhatDanhGiaKhoaHoc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DanhGiaKhoaHoc",
                columns: table => new
                {
                    maDanhGia = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    maHv = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    maKh = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    noiDung = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    soSao = table.Column<int>(type: "int", nullable: true),
                    ngayDg = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DanhGiaKhoaHoc", x => x.maDanhGia);
                    table.ForeignKey(
                        name: "FK_DanhGiaKhoaHoc_HocVien",
                        column: x => x.maHv,
                        principalTable: "HocVien",
                        principalColumn: "maHv",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DanhGiaKhoaHoc_KhoaHoa",
                        column: x => x.maKh,
                        principalTable: "KhoaHoc",
                        principalColumn: "maKh",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DanhGiaKhoaHoc_maHv",
                table: "DanhGiaKhoaHoc",
                column: "maHv");

            migrationBuilder.CreateIndex(
                name: "IX_DanhGiaKhoaHoc_maKh",
                table: "DanhGiaKhoaHoc",
                column: "maKh");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DanhGiaKhoaHoc");
        }
    }
}
