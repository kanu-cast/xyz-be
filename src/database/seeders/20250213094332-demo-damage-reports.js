// Damage Report Seeder
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("DamageReports", [
      {
        damage_id: "7e8f9a0b-5678-4c3d-9101-abcdef654321", // Damage record
        item_id: "e4d8a9cf-1234-5678-9101-abcdefabcdef", // Dell XPS 15
        reported_by: "b1a8a9cf-1234-5678-9101-abcdefabcdef", // Alice Johnson
        report_date: new Date(),
        damage_reason: "Laptop screen cracked during usage.",
        repair_status: "Pending"
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("DamageReports", null, {});
  }
};
