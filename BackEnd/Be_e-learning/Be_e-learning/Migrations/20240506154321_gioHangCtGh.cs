using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class gioHangCtGh : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GioHang",
                columns: table => new
                {
                    maGh = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    maHv = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    tongTien = table.Column<float>(type: "real", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GioHang", x => x.maGh);
                    table.ForeignKey(
                        name: "FK_gioHang_hocVien",
                        column: x => x.maGh,
                        principalTable: "HocVien",
                        principalColumn: "maHv",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChiTietGioHang",
                columns: table => new
                {
                    MaKh = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    maGh = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietGioHang", x => x.MaKh);
                    table.ForeignKey(
                        name: "FK_chiTietGioHang_gioHang",
                        column: x => x.maGh,
                        principalTable: "GioHang",
                        principalColumn: "maGh",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_chiTietGioHang_khoaHoc",
                        column: x => x.maGh,
                        principalTable: "KhoaHoc",
                        principalColumn: "maKh",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietGioHang_maGh",
                table: "ChiTietGioHang",
                column: "maGh");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChiTietGioHang");

            migrationBuilder.DropTable(
                name: "GioHang");
        }
    }
}
