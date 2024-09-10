﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class capnhatVideo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "videoUlr",
                table: "Video",
                type: "varchar(max)",
                unicode: false,
                maxLength: 2147483647,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldUnicode: false,
                oldMaxLength: 255,
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "videoUlr",
                table: "Video",
                type: "varchar(255)",
                unicode: false,
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(max)",
                oldUnicode: false,
                oldMaxLength: 2147483647,
                oldNullable: true);
        }
    }
}
