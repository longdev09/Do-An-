using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class themKhoaHocDaMua : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "thoiLuongVideo",
                table: "Video",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "KhoaHocDaMua",
                columns: table => new
                {
                    maHv = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    maKh = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    tienTrinh = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhoaHocDaMua", x => x.maHv);
                    table.ForeignKey(
                        name: "FK_KhoaHocDaMuas_HoaDon",
                        column: x => x.maKh,
                        principalTable: "KhoaHoc",
                        principalColumn: "maKh",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_KhoaHocDaMuas_KhoaHoc",
                        column: x => x.maKh,
                        principalTable: "HocVien",
                        principalColumn: "maHv",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KhoaHocDaMua_maKh",
                table: "KhoaHocDaMua",
                column: "maKh");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KhoaHocDaMua");

            migrationBuilder.DropColumn(
                name: "thoiLuongVideo",
                table: "Video");
        }
    }
}
