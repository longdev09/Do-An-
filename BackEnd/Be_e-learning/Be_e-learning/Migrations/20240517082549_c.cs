using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class c : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KhoaHocDaMuas_HoaDon",
                table: "KhoaHocDaMua");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KhoaHocDaMua",
                table: "KhoaHocDaMua");

            migrationBuilder.DropIndex(
                name: "IX_KhoaHocDaMua_maKh",
                table: "KhoaHocDaMua");

            migrationBuilder.AlterColumn<string>(
                name: "maKh",
                table: "KhoaHocDaMua",
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
                name: "PK_KhoaHocDaMua",
                table: "KhoaHocDaMua",
                columns: new[] { "maKh", "maHv" });

            migrationBuilder.CreateIndex(
                name: "IX_KhoaHocDaMua_maHv",
                table: "KhoaHocDaMua",
                column: "maHv");

            migrationBuilder.AddForeignKey(
                name: "FK_KhoaHocDaMuas_HoaDon",
                table: "KhoaHocDaMua",
                column: "maKh",
                principalTable: "KhoaHoc",
                principalColumn: "maKh",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KhoaHocDaMuas_HoaDon",
                table: "KhoaHocDaMua");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KhoaHocDaMua",
                table: "KhoaHocDaMua");

            migrationBuilder.DropIndex(
                name: "IX_KhoaHocDaMua_maHv",
                table: "KhoaHocDaMua");

            migrationBuilder.AlterColumn<string>(
                name: "maKh",
                table: "KhoaHocDaMua",
                type: "varchar(255)",
                unicode: false,
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldUnicode: false,
                oldMaxLength: 255);

            migrationBuilder.AddPrimaryKey(
                name: "PK_KhoaHocDaMua",
                table: "KhoaHocDaMua",
                column: "maHv");

            migrationBuilder.CreateIndex(
                name: "IX_KhoaHocDaMua_maKh",
                table: "KhoaHocDaMua",
                column: "maKh");

            migrationBuilder.AddForeignKey(
                name: "FK_KhoaHocDaMuas_HoaDon",
                table: "KhoaHocDaMua",
                column: "maKh",
                principalTable: "KhoaHoc",
                principalColumn: "maKh",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
