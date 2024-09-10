using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class capnhattennoidungbaigiang : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Video_NoiDung",
                table: "Video");

            migrationBuilder.DropTable(
                name: "NoiDung");

            migrationBuilder.CreateTable(
                name: "BaiGiang",
                columns: table => new
                {
                    maBg = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    tieuDe = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    moTa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    stt = table.Column<int>(type: "int", nullable: false),
                    maCh = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    maLoaiNd = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaiGiang", x => x.maBg);
                    table.ForeignKey(
                        name: "FK_BaiGiang_ChuongKhoaHoc",
                        column: x => x.maCh,
                        principalTable: "ChuongKhoaHoc",
                        principalColumn: "maCh",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BaiGiang_LoaiNoiDung",
                        column: x => x.maLoaiNd,
                        principalTable: "LoaiNoiDung",
                        principalColumn: "maLoaiNd",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BaiGiang_maCh",
                table: "BaiGiang",
                column: "maCh");

            migrationBuilder.CreateIndex(
                name: "IX_BaiGiang_maLoaiNd",
                table: "BaiGiang",
                column: "maLoaiNd");

            migrationBuilder.AddForeignKey(
                name: "FK_Video_NoiDung",
                table: "Video",
                column: "maNd",
                principalTable: "BaiGiang",
                principalColumn: "maBg",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Video_NoiDung",
                table: "Video");

            migrationBuilder.DropTable(
                name: "BaiGiang");

            migrationBuilder.CreateTable(
                name: "NoiDung",
                columns: table => new
                {
                    maNd = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    maCh = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    maLoaiNd = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    moTa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    stt = table.Column<int>(type: "int", nullable: false),
                    tieuDe = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NoiDung", x => x.maNd);
                    table.ForeignKey(
                        name: "FK_Noidung_ChuongKhoaHoc",
                        column: x => x.maCh,
                        principalTable: "ChuongKhoaHoc",
                        principalColumn: "maCh",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Noidung_LoaiNoiDung",
                        column: x => x.maLoaiNd,
                        principalTable: "LoaiNoiDung",
                        principalColumn: "maLoaiNd",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NoiDung_maCh",
                table: "NoiDung",
                column: "maCh");

            migrationBuilder.CreateIndex(
                name: "IX_NoiDung_maLoaiNd",
                table: "NoiDung",
                column: "maLoaiNd");

            migrationBuilder.AddForeignKey(
                name: "FK_Video_NoiDung",
                table: "Video",
                column: "maNd",
                principalTable: "NoiDung",
                principalColumn: "maNd",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
