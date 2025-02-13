"use strict";

// People Seeder
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("People", [
      {
        person_id: "d3c8a9cf-1234-5678-9101-abcdefabcdef", // Borrower (Trainee)
        full_name: "Lilliane Uwase",
        national_id: "11998877665544",
        email: "lilliane@example.com",
        phone_number: "1122334455",
        residence: "Kigali, Rwanda",
        assurer_name: "Igire Rwanda",
        assurer_contact: "6677889900"
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("People", null, {});
  }
};
