// Migration for Damage Reports Table
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("damageReports", {
      damage_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      item_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "inventoryItems",
          key: "item_id"
        }
      },
      reported_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
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
        type: Sequelize.ENUM("pending", "under repair", "disposed"),
        defaultValue: "pending"
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("damageReports");
  }
};
