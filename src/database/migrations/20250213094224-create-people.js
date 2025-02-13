// Migration for People Table
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("People", {
      person_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      national_id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      residence: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      assurer_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      assurer_contact: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("People");
  }
};
