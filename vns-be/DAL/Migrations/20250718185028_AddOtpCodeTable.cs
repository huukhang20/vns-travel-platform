using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddOtpCodeTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ComboServices_Combos_ComboId",
                table: "ComboServices");

            migrationBuilder.DropForeignKey(
                name: "FK_ComboServices_Services_ServiceId",
                table: "ComboServices");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceLocations_Locations_LocationId",
                table: "ServiceLocations");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceLocations_Services_ServiceId",
                table: "ServiceLocations");

            migrationBuilder.DropForeignKey(
                name: "FK_ServicePromotions_Services_ServiceId",
                table: "ServicePromotions");

            migrationBuilder.CreateTable(
                name: "OtpCodes",
                columns: table => new
                {
                    OtpCodeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Expiry = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtpCodes", x => x.OtpCodeId);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_ComboServices_Combos_ComboId",
                table: "ComboServices",
                column: "ComboId",
                principalTable: "Combos",
                principalColumn: "ComboId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ComboServices_Services_ServiceId",
                table: "ComboServices",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceLocations_Locations_LocationId",
                table: "ServiceLocations",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "LocationId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceLocations_Services_ServiceId",
                table: "ServiceLocations",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ServicePromotions_Services_ServiceId",
                table: "ServicePromotions",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ComboServices_Combos_ComboId",
                table: "ComboServices");

            migrationBuilder.DropForeignKey(
                name: "FK_ComboServices_Services_ServiceId",
                table: "ComboServices");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceLocations_Locations_LocationId",
                table: "ServiceLocations");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceLocations_Services_ServiceId",
                table: "ServiceLocations");

            migrationBuilder.DropForeignKey(
                name: "FK_ServicePromotions_Services_ServiceId",
                table: "ServicePromotions");

            migrationBuilder.DropTable(
                name: "OtpCodes");

            migrationBuilder.AddForeignKey(
                name: "FK_ComboServices_Combos_ComboId",
                table: "ComboServices",
                column: "ComboId",
                principalTable: "Combos",
                principalColumn: "ComboId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ComboServices_Services_ServiceId",
                table: "ComboServices",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceLocations_Locations_LocationId",
                table: "ServiceLocations",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "LocationId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceLocations_Services_ServiceId",
                table: "ServiceLocations",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServicePromotions_Services_ServiceId",
                table: "ServicePromotions",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
