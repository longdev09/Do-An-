using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class ud : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ThongTinThanhToan",
                columns: table => new
                {
                    maTt = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    tenNganHang = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    logoNganHang = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    stk = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    nguoiThuHuong = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    maGv = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThongTinThanhToan", x => x.maTt);
                    table.ForeignKey(
                        name: "FK_thongTinThanhToan_giangVien",
                        column: x => x.maGv,
                        principalTable: "GiangVien",
                        principalColumn: "maGv",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ThongTinThanhToan_maGv",
                table: "ThongTinThanhToan",
                column: "maGv",
                unique: true,
                filter: "[maGv] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ThongTinThanhToan");
        }
    }
}
