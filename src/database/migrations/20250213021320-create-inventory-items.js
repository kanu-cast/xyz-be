// Migration: create-inventory-items
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("InventoryItems", {
      item_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.ENUM(
          "Device",
          "Furniture",
          "Cleaning Material",
          "Food Utensil"
        ),
        allowNull: false
      },
      serial_number: {
        type: Sequelize.STRING,
        unique: true
      },
      condition: {
        type: Sequelize.ENUM("New", "Good", "Worn Out", "Broken"),
        defaultValue: "New"
      },
      status: {
        type: Sequelize.ENUM("Available", "Borrowed", "Damaged", "Disposed"),
        defaultValue: "Available"
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("InventoryItems");
  }
};
