/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('drivers').del()
  await knex('drivers').insert([
    {
      username: "john_doe",
      age: 35,
      phone_number: "1234567890",
      password: "johnsecure123",
      car_name: "Toyota Camry",
      model: "2021",
      color: "Black",
      license_plate_number: "ABC1234",
    },
    {
      username: "jane_smith",
      age: 29,
      phone_number: "9876543210",
      password: "janepass456",
      car_name: "Honda Civic",
      model: "2019",
      color: "White",
      license_plate_number: "XYZ5678",
    },
    {
      username: "mike_jones",
      age: 40,
      phone_number: "5556667777",
      password: "mikepass789",
      car_name: "Ford Mustang",
      model: "2020",
      color: "Red",
      license_plate_number: "LMN3456",
    },
    {
      username: "emily_clark",
      age: 33,
      phone_number: "4445556666",
      password: "emilysecure",
      car_name: "Tesla Model 3",
      model: "2022",
      color: "Blue",
      license_plate_number: "TES7890",
    },
    {
      username: "david_white",
      age: 38,
      phone_number: "3332221111",
      password: "davidpass321",
      car_name: "Chevrolet Malibu",
      model: "2018",
      color: "Silver",
      license_plate_number: "CHEV4321",
    },
    {
      username: "sarah_miller",
      age: 27,
      phone_number: "7778889999",
      password: "sarahpass654",
      car_name: "BMW X5",
      model: "2023",
      color: "Gray",
      license_plate_number: "BMW5678",
    },
  ]);
};
