using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BaiGiang");

            migrationBuilder.DropTable(
                name: "NoiDungChuong");

            migrationBuilder.CreateTable(
                name: "LoaiNoiDung",
                columns: table => new
                {
                    maLoaiNd = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    tenLoai = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoaiNoiDung", x => x.maLoaiNd);
                });

            migrationBuilder.CreateTable(
                name: "NoiDung",
                columns: table => new
                {
                    maNd = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    tieuDe = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    moTa = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    stt = table.Column<int>(type: "int", nullable: false),
                    maCh = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    maLoaiNd = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
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
                        column: x => x.maCh,
                        principalTable: "LoaiNoiDung",
                        principalColumn: "maLoaiNd",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Video",
                columns: table => new
                {
                    maVideo = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    video = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    maNd = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Video", x => x.maVideo);
                    table.ForeignKey(
                        name: "FK_Video_NoiDung",
                        column: x => x.maNd,
                        principalTable: "NoiDung",
                        principalColumn: "maNd",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NoiDung_maCh",
                table: "NoiDung",
                column: "maCh");

            migrationBuilder.CreateIndex(
                name: "IX_Video_maNd",
                table: "Video",
                column: "maNd",
                unique: true,
                filter: "[maNd] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Video");

            migrationBuilder.DropTable(
                name: "NoiDung");

            migrationBuilder.DropTable(
                name: "LoaiNoiDung");

            migrationBuilder.CreateTable(
                name: "NoiDungChuong",
                columns: table => new
                {
                    maNd = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    maCh = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    moTa = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    stt = table.Column<int>(type: "int", nullable: false),
                    tieuDe = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NoiDungChuong", x => x.maNd);
                    table.ForeignKey(
                        name: "FK_NoidungChuong_ChuongKhoaHoc",
                        column: x => x.maCh,
                        principalTable: "ChuongKhoaHoc",
                        principalColumn: "maCh",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BaiGiang",
                columns: table => new
                {
                    maBg = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    maNd = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    video = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaiGiang", x => x.maBg);
                    table.ForeignKey(
                        name: "FK_BaiGiang_NoiDungChuong",
                        column: x => x.maNd,
                        principalTable: "NoiDungChuong",
                        principalColumn: "maNd",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BaiGiang_maNd",
                table: "BaiGiang",
                column: "maNd",
                unique: true,
                filter: "[maNd] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_NoiDungChuong_maCh",
                table: "NoiDungChuong",
                column: "maCh");
        }
    }
}
