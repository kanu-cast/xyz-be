// Inventory Item Seeder
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("inventoryItems", [
      {
        item_id: "e4d8a9cf-1234-5678-9101-abcdefabcdef", // Laptop being borrowed
        name: "Dell XPS 15",
        category: "Device",
        serial_number: "DELL12345",
        condition: "new",
        status: "borrowed",
        created_at: new Date()
      },
      {
        item_id: "e4d8a9cf-1234-4b78-9101-abcdef123456", // mop stick being returned
        name: "mop stick",
        category: "Cleaning Material",
        condition: "good",
        status: "available",
        created_at: new Date()
      },
      {
        item_id: "a1b2c3d4-5678-4ef9-9101-123456789abc", // chair being borrowed
        name: "chair",
        category: "Furniture",
        condition: "worn out",
        status: "borrowed",
        created_at: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("inventoryItems", null, {});
  }
};
