"use strict";
// Seeder file for system_logs
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("system_logs", [
      {
        log_id: "f9e8a9cf-1234-5678-9101-abcdefabcdef",
        user_id: "b1a8a9cf-1234-5678-9101-abcdefabcdef", // the admin, so far we have 1 admin
        action_id: "aaa11111-1111-1111-1111-111111111111", // Admin Added new inventory item
        item_id: "e4d8a9cf-1234-5678-9101-abcdefabcdef",
        borrow_id: "987a9cf1-6543-5678-9101-fedcba567890",
        damage_id: "7e8f9a0b-5678-4c3d-9101-abcdef654321",

        timestamp: "2025-02-13T12:00:00.000Z"
      },
      {
        log_id: "f5e6d7c8-1234-4a5b-9101-987654321abc",
        user_id: "b1a8a9cf-1234-5678-9101-abcdefabcdef", // the admin, so far we have 1 admin
        action_id: "bbb22222-2222-2222-2222-222222222222", // Admin assigns item to borrower
        item_id: "e4d8a9cf-1234-4b78-9101-abcdef123456",
        borrow_id: "987a9cf1-6543-5678-9101-fedcba567890",
        // damage_id: "321a9cf1-8765-5678-9101-fedcba432109",
        timestamp: "2025-02-13T12:00:00.000Z"
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("system_logs", null, {});
  }
};
