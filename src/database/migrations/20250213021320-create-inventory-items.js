// Migration: create-inventory-items
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("inventoryItems", {
      item_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
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
        allowNull: true
        // unique: true
      },
      condition: {
        type: Sequelize.ENUM("new", "good", "worn out", "broken"),
        defaultValue: "new"
      },
      status: {
        type: Sequelize.ENUM("available", "borrowed", "damaged", "disposed"),
        defaultValue: "available"
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("inventoryItems");
  }
};
