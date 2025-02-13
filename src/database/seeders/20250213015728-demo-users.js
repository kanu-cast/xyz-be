// Seeder: demo-users
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("Users", [
      {
        user_id: uuidv4(),
        full_name: "Admin User",
        email: "admin@example.com",
        password_hash: "hashedpassword",
        phone_number: "+250788123456",
        role: "Inventory Manager",
        created_at: new Date()
      },
      {
        user_id: uuidv4(),
        full_name: "Program Manager",
        email: "program@example.com",
        password_hash: "hashedpassword",
        phone_number: "+250780123456",
        role: "Program Manager",
        created_at: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
