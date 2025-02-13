"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("actions", [
      {
        action_id: "aaa11111-1111-1111-1111-111111111111",
        description: "Added new inventory item"
      },
      {
        action_id: "bbb22222-2222-2222-2222-222222222222",
        description: "Assigned item to borrower"
      },
      {
        action_id: "ccc33333-3333-3333-3333-333333333333",
        description: "Logged damage report"
      },
      {
        action_id: "ddd44444-4444-4444-4444-444444444444",
        description: "updated Item status"
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("actions", null, {});
  }
};
