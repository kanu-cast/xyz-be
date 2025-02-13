""; // User Seeder
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("users", [
      {
        user_id: "b1a8a9cf-1234-5678-9101-abcdefabcdef", // Inventory Manager(Admin)
        full_name: "Lilliane Uwase",
        email: "admin@xyz.com",
        password: "pass123",
        phone_number: "1234567890",
        role: "inventory manager",
        created_at: new Date()
      },
      {
        user_id: "c2b8a9cf-1234-5678-9101-abcdefabcdef", // Program Manager
        full_name: "Jean Eric",
        email: "manager@xyz.com",
        password: "pass123",
        phone_number: "0987654321",
        role: "program manager",
        created_at: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", null, {});
  }
};
