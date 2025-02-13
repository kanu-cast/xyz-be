// Borrowing Seeder
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("Borrowing", [
      {
        borrow_id: "987a9cf1-6543-5678-9101-fedcba567890", // Borrowing record
        item_id: "e4d8a9cf-1234-5678-9101-abcdefabcdef", // Dell XPS 15
        borrower_id: "d3c8a9cf-1234-5678-9101-abcdefabcdef", // Lilliane Uwase
        assigned_by: "b1a8a9cf-1234-5678-9101-abcdefabcdef", // Alice Johnson
        borrow_date: new Date(),
        expected_return_date: new Date(
          new Date().setDate(new Date().getDate() + 7)
        ),
        initial_condition: "New",
        return_condition: null,
        is_overdue: false
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Borrowing", null, {});
  }
};
