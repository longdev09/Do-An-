using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class addNoiDung_BaiGiang : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DanhMuc",
                columns: table => new
                {
                    maDm = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    tenDm = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DanhMuc", x => x.maDm);
                });

            migrationBuilder.CreateTable(
                name: "VaiTro",
                columns: table => new
                {
                    maVt = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    tenVt = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VaiTro", x => x.maVt);
                });

            migrationBuilder.CreateTable(
                name: "NguoiDung",
                columns: table => new
                {
                    maNg = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    tenDn = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    matKhau = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    maVt = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NguoiDung", x => x.maNg);
                    table.ForeignKey(
                        name: "FK_nguoiDung_vaiTro",
                        column: x => x.maVt,
                        principalTable: "VaiTro",
                        principalColumn: "maVt",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GiangVien",
                columns: table => new
                {
                    maGv = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    tenGv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ngaySinh = table.Column<DateTime>(type: "date", nullable: true),
                    phai = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    sdt = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: true),
                    email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    maNg = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiangVien", x => x.maGv);
                    table.ForeignKey(
                        name: "FK_giangVien_nguoiDung",
                        column: x => x.maNg,
                        principalTable: "NguoiDung",
                        principalColumn: "maNg",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "KhoaHoc",
                columns: table => new
                {
                    maKh = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    tenKh = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    gia = table.Column<float>(type: "real", nullable: true),
                    hinh = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    gioiThieu = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    trangThai = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ketQuaDatDuoc = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    maGv = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    maDm = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhoaHoc", x => x.maKh);
                    table.ForeignKey(
                        name: "FK_khoaHoc_danhmuc",
                        column: x => x.maDm,
                        principalTable: "DanhMuc",
                        principalColumn: "maDm",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_khoaHoc_giangVien",
                        column: x => x.maGv,
                        principalTable: "GiangVien",
                        principalColumn: "maGv",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ChuongKhoaHoc",
                columns: table => new
                {
                    maCh = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    maKh = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    tenChuong = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    stt = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChuongKhoaHoc", x => x.maCh);
                    table.ForeignKey(
                        name: "FK_ChuongKhoaHoc_khoaHoc",
                        column: x => x.maKh,
                        principalTable: "KhoaHoc",
                        principalColumn: "maKh",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NoiDungChuong",
                columns: table => new
                {
                    maNd = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    tieuDe = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    moTa = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    stt = table.Column<int>(type: "int", nullable: false),
                    maCh = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
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
                    video = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    maNd = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
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
                name: "IX_ChuongKhoaHoc_maKh",
                table: "ChuongKhoaHoc",
                column: "maKh");

            migrationBuilder.CreateIndex(
                name: "IX_GiangVien_maNg",
                table: "GiangVien",
                column: "maNg");

            migrationBuilder.CreateIndex(
                name: "IX_KhoaHoc_maDm",
                table: "KhoaHoc",
                column: "maDm");

            migrationBuilder.CreateIndex(
                name: "IX_KhoaHoc_maGv",
                table: "KhoaHoc",
                column: "maGv");

            migrationBuilder.CreateIndex(
                name: "IX_NguoiDung_maVt",
                table: "NguoiDung",
                column: "maVt");

            migrationBuilder.CreateIndex(
                name: "IX_NoiDungChuong_maCh",
                table: "NoiDungChuong",
                column: "maCh");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BaiGiang");

            migrationBuilder.DropTable(
                name: "NoiDungChuong");

            migrationBuilder.DropTable(
                name: "ChuongKhoaHoc");

            migrationBuilder.DropTable(
                name: "KhoaHoc");

            migrationBuilder.DropTable(
                name: "DanhMuc");

            migrationBuilder.DropTable(
                name: "GiangVien");

            migrationBuilder.DropTable(
                name: "NguoiDung");

            migrationBuilder.DropTable(
                name: "VaiTro");
        }
    }
}
