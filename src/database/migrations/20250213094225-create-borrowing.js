// Migration for Borrowing Table
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("borrowings", {
      borrow_id: {
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
      borrower_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "peoples",
          key: "person_id"
        }
      },
      assigned_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
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
        type: Sequelize.ENUM("new", "good", "worn out", "broken"),
        defaultValue: "new"
      },
      return_condition: {
        type: Sequelize.ENUM("new", "good", "worn out", "broken"),
        allowNull: true
      },
      is_overdue: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("borrowings");
  }
};
