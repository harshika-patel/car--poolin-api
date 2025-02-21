/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    // Deletes ALL existing entries
    await knex("rides").del();
  
    // Inserts seed entries
    await knex("rides").insert([
      {
        from: "Toronto",
        to: "Montreal",
        date: "2025-02-21",
        time: "10:00",
        price: 50.00,
        seats: 3,
      },
      {
        from: "Vancouver",
        to: "Calgary",
        date: "2025-02-22",
        time: "12:30",
        price: 70.00,
        seats: 2,
      },
      {
        from: "Ottawa",
        to: "Quebec City",
        date: "2025-02-23",
        time: "15:45",
        price: 40.00,
        seats: 4,
      }
    ]);
  }
  