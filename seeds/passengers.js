/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('passengers').del()
  await knex('passengers').insert([
    {
      username: "john_doe",
      password: "password123",
      age: 28,
      phone_number: "1234567890",
    },
    {
      username: "jane_smith",
      password: "securepass",
      age: 24,
      phone_number: "9876543210",
    },
    {
      username: "mike_jones",
      password: "mike1234",
      age: 32,
      phone_number: "5556667777",
    },
    {
      username: "emily_clark",
      password: "emilysecure",
      age: 26,
      phone_number: "4445556666",
    },
    {
      username: "david_white",
      password: "davidpass",
      age: 30,
      phone_number: "3332221111",
    },
    {
      username: "sarah_miller",
      password: "sarah456",
      age: 27,
      phone_number: "7778889999",
    },
  ]);
};
