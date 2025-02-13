// Migration for Borrowing Table
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Borrowing", {
      borrow_id: {
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
      borrower_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "People",
          key: "person_id"
        }
      },
      assigned_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "user_id"
        }
      },
      borrow_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      expected_return_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      return_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      initial_condition: {
        type: Sequelize.ENUM("New", "Good", "Worn Out", "Broken"),
        defaultValue: "Good"
      },
      return_condition: {
        type: Sequelize.ENUM("New", "Good", "Worn Out", "Broken"),
        allowNull: true
      },
      is_overdue: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Borrowing");
  }
};
