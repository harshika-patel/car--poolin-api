/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    // Deletes ALL existing entries to prevent duplicates
    await knex("rides").del();
  
    // Fetch drivers from the database to link rides correctly
    const drivers = await knex("drivers").select("id", "username");
  
    // Create a mapping of driver usernames to their IDs
    const driverMap = {};
    drivers.forEach(driver => {
      driverMap[driver.username] = driver.id;
    });
  
    // Insert ride records linked to actual driver IDs
    await knex("rides").insert([
      {
        from: "New York",
        to: "Boston",
        date: "2025-03-01",
        time: "08:30:00",
        price: 25.00,
        seats: 3,
        is_booked: false,
        booked_seats: 0,
        driver_id: driverMap["john_doe"], // Linking to John Doe
      },
      {
        from: "Los Angeles",
        to: "San Francisco",
        date: "2025-03-02",
        time: "10:00:00",
        price: 40.00,
        seats: 2,
        is_booked: false,
      booked_seats: 0,
        driver_id: driverMap["jane_smith"], // Linking to Jane Smith
      },
      {
        from: "Chicago",
        to: "Detroit",
        date: "2025-03-03",
        time: "14:15:00",
        price: 30.00,
        seats: 4,
        is_booked: false,
      booked_seats: 0,
        driver_id: driverMap["mike_jones"], // Linking to Mike Jones
      },
      {
        from: "Dallas",
        to: "Houston",
        date: "2025-03-04",
        time: "12:45:00",
        price: 20.00,
        seats: 5,
        is_booked: false,
      booked_seats: 0,
        driver_id: driverMap["emily_clark"], // Linking to Emily Clark
      },
      {
        from: "Seattle",
        to: "Portland",
        date: "2025-03-05",
        time: "16:30:00",
        price: 22.00,
        seats: 3,
        is_booked: false,
      booked_seats: 0,
        driver_id: driverMap["david_white"], // Linking to David White
      },
      {
        from: "Miami",
        to: "Orlando",
        date: "2025-03-06",
        time: "09:15:00",
        price: 18.00,
        seats: 2,
        is_booked: false,
      booked_seats: 0,
        driver_id: driverMap["sarah_miller"], // Linking to Sarah Miller
      },
    ]);
  }
  