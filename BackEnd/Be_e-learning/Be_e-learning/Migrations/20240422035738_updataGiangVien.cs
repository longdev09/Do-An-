using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class updataGiangVien : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "avata",
                table: "GiangVien",
                type: "varchar(255)",
                unicode: false,
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "linhVuc",
                table: "GiangVien",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "matSauCccd",
                table: "GiangVien",
                type: "varchar(255)",
                unicode: false,
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "matTruocCccd",
                table: "GiangVien",
                type: "varchar(255)",
                unicode: false,
                maxLength: 255,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "avata",
                table: "GiangVien");

            migrationBuilder.DropColumn(
                name: "linhVuc",
                table: "GiangVien");

            migrationBuilder.DropColumn(
                name: "matSauCccd",
                table: "GiangVien");

            migrationBuilder.DropColumn(
                name: "matTruocCccd",
                table: "GiangVien");
        }
    }
}
