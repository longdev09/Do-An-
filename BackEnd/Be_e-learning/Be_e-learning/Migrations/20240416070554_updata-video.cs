using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class updatavideo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "video",
                table: "Video",
                newName: "videoUlr");

            migrationBuilder.AddColumn<DateTime>(
                name: "ngay",
                table: "Video",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "tenFile",
                table: "Video",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ngay",
                table: "Video");

            migrationBuilder.DropColumn(
                name: "tenFile",
                table: "Video");

            migrationBuilder.RenameColumn(
                name: "videoUlr",
                table: "Video",
                newName: "video");
        }
    }
}
