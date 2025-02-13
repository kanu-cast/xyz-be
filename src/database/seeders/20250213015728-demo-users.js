""; // User Seeder
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("Users", [
      {
        user_id: "b1a8a9cf-1234-5678-9101-abcdefabcdef", // Inventory Manager(Admin)
        full_name: "Alice Johnson",
        email: "alice@example.com",
        password_hash: "hashedpassword123",
        phone_number: "1234567890",
        role: "Inventory Manager",
        created_at: new Date()
      },
      {
        user_id: "c2b8a9cf-1234-5678-9101-abcdefabcdef", // Program Manager
        full_name: "Bob Smith",
        email: "bob@example.com",
        password_hash: "hashedpassword456",
        phone_number: "0987654321",
        role: "Program Manager",
        created_at: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
