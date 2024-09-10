using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class cnn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ketQua",
                table: "DapAn",
                newName: "sttDn");

            migrationBuilder.AddColumn<int>(
                name: "dapAnDung",
                table: "TracNghiem",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "dapAnDung",
                table: "TracNghiem");

            migrationBuilder.RenameColumn(
                name: "sttDn",
                table: "DapAn",
                newName: "ketQua");
        }
    }
}
