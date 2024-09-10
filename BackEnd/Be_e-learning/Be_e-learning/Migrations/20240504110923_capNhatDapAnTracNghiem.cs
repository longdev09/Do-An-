using Microsoft.EntityFrameworkCore.Migrations;

namespace Be_e_learning.Migrations
{
    public partial class capNhatDapAnTracNghiem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TracNghiem",
                columns: table => new
                {
                    maTrn = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    tenCauHoi = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    maNd = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TracNghiem", x => x.maTrn);
                    table.ForeignKey(
                        name: "FK_TracNghiem_NoiDung",
                        column: x => x.maNd,
                        principalTable: "NoiDung",
                        principalColumn: "maNd",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DapAn",
                columns: table => new
                {
                    maDa = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    tenDa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ketQua = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    maTrn = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DapAn", x => x.maDa);
                    table.ForeignKey(
                        name: "FK_DapAn_TracNghiem",
                        column: x => x.maTrn,
                        principalTable: "TracNghiem",
                        principalColumn: "maTrn",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DapAn_maTrn",
                table: "DapAn",
                column: "maTrn");

            migrationBuilder.CreateIndex(
                name: "IX_TracNghiem_maNd",
                table: "TracNghiem",
                column: "maNd");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DapAn");

            migrationBuilder.DropTable(
                name: "TracNghiem");
        }
    }
}
