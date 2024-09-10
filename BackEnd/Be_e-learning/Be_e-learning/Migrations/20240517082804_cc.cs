using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class cc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_chiTietGioHang_gioHang",
                table: "ChiTietGioHang");

            migrationBuilder.DropForeignKey(
                name: "FK_ChiTietHoaDons_HoaDon",
                table: "ChiTietHoaDon");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChiTietHoaDon",
                table: "ChiTietHoaDon");

            migrationBuilder.DropIndex(
                name: "IX_ChiTietHoaDon_maHd",
                table: "ChiTietHoaDon");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChiTietGioHang",
                table: "ChiTietGioHang");

            migrationBuilder.DropIndex(
                name: "IX_ChiTietGioHang_maGh",
                table: "ChiTietGioHang");

            migrationBuilder.AlterColumn<string>(
                name: "maHd",
                table: "ChiTietHoaDon",
                type: "varchar(255)",
                unicode: false,
                maxLength: 255,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldUnicode: false,
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "maGh",
                table: "ChiTietGioHang",
                type: "varchar(255)",
                unicode: false,
                maxLength: 255,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldUnicode: false,
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChiTietHoaDon",
                table: "ChiTietHoaDon",
                columns: new[] { "maHd", "maKh" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChiTietGioHang",
                table: "ChiTietGioHang",
                columns: new[] { "maGh", "maKh" });

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietHoaDon_maKh",
                table: "ChiTietHoaDon",
                column: "maKh");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietGioHang_maKh",
                table: "ChiTietGioHang",
                column: "maKh");

            migrationBuilder.AddForeignKey(
                name: "FK_chiTietGioHang_gioHang",
                table: "ChiTietGioHang",
                column: "maGh",
                principalTable: "GioHang",
                principalColumn: "maGh",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ChiTietHoaDons_HoaDon",
                table: "ChiTietHoaDon",
                column: "maHd",
                principalTable: "HoaDon",
                principalColumn: "maHd",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_chiTietGioHang_gioHang",
                table: "ChiTietGioHang");

            migrationBuilder.DropForeignKey(
                name: "FK_ChiTietHoaDons_HoaDon",
                table: "ChiTietHoaDon");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChiTietHoaDon",
                table: "ChiTietHoaDon");

            migrationBuilder.DropIndex(
                name: "IX_ChiTietHoaDon_maKh",
                table: "ChiTietHoaDon");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChiTietGioHang",
                table: "ChiTietGioHang");

            migrationBuilder.DropIndex(
                name: "IX_ChiTietGioHang_maKh",
                table: "ChiTietGioHang");

            migrationBuilder.AlterColumn<string>(
                name: "maHd",
                table: "ChiTietHoaDon",
                type: "varchar(255)",
                unicode: false,
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldUnicode: false,
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "maGh",
                table: "ChiTietGioHang",
                type: "varchar(255)",
                unicode: false,
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldUnicode: false,
                oldMaxLength: 255);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChiTietHoaDon",
                table: "ChiTietHoaDon",
                column: "maKh");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChiTietGioHang",
                table: "ChiTietGioHang",
                column: "maKh");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietHoaDon_maHd",
                table: "ChiTietHoaDon",
                column: "maHd");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietGioHang_maGh",
                table: "ChiTietGioHang",
                column: "maGh");

            migrationBuilder.AddForeignKey(
                name: "FK_chiTietGioHang_gioHang",
                table: "ChiTietGioHang",
                column: "maGh",
                principalTable: "GioHang",
                principalColumn: "maGh",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChiTietHoaDons_HoaDon",
                table: "ChiTietHoaDon",
                column: "maHd",
                principalTable: "HoaDon",
                principalColumn: "maHd",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
