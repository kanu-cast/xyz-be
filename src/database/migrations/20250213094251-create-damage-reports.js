// Migration for Damage Reports Table
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("DamageReports", {
      damage_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      item_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "InventoryItems",
          key: "item_id"
        }
      },
      reported_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "user_id"
        }
      },
      report_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      damage_reason: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      repair_status: {
        type: Sequelize.ENUM("Pending", "Under Repair", "Disposed"),
        defaultValue: "Pending"
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("DamageReports");
  }
};
