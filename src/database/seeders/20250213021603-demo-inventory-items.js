// Seeder: demo-inventory-items
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("InventoryItems", [
      {
        item_id: uuidv4(),
        name: "Laptop",
        category: "Device",
        serial_number: "SN123456789",
        condition: "New",
        status: "Available",
        created_at: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("InventoryItems", null, {});
  }
};
