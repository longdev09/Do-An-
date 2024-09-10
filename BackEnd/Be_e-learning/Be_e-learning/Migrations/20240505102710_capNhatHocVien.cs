using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class capNhatHocVien : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HocVien",
                columns: table => new
                {
                    maHv = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    hoTen = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ngaySinh = table.Column<DateTime>(type: "date", nullable: false),
                    avata = table.Column<string>(type: "varchar(max)", unicode: false, maxLength: 2147483647, nullable: true),
                    email = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    sdt = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    maNg = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HocVien", x => x.maHv);
                    table.ForeignKey(
                        name: "FK_hocvien_nguoiDung",
                        column: x => x.maNg,
                        principalTable: "NguoiDung",
                        principalColumn: "maNg",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HocVien_maNg",
                table: "HocVien",
                column: "maNg",
                unique: true,
                filter: "[maNg] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HocVien");
        }
    }
}
