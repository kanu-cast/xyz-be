"use strict";

// Migration file for system_logs
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("system_logs", {
      log_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "user_id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      action_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "actions",
          key: "action_id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      item_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "InventoryItems",
          key: "item_id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      borrow_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "Borrowing",
          key: "borrow_id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      damage_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "DamageReports",
          key: "damage_id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("system_logs");
  }
};
