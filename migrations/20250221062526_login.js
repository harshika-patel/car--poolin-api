/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    // Create a new table for user logins
    await knex.schema.createTable("user_logins", (table) => {
        table.increments("id").primary(); // Unique ID for the login record
        table.string("username").notNullable(); // Store the username
        table.string("password").notNullable(); // Store the password (consider hashing for security)
        table.integer("user_id").unsigned().notNullable(); // Foreign key to reference the user ID from drivers or passengers
        table.string("role").notNullable(); // Role to differentiate between driver and passenger
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });

    // Populate the user_logins table from the drivers table
    const drivers = await knex("drivers").select("id as user_id", "username", "password");
    const driverLogins = drivers.map(driver => ({
        username: driver.username,
        password: driver.password,
        user_id: driver.user_id,
        role: "driver"
    }));
    await knex("user_logins").insert(driverLogins);

    // Populate the user_logins table from the passengers table
    const passengers = await knex("passengers").select("id as user_id", "username", "password");
    const passengerLogins = passengers.map(passenger => ({
        username: passenger.username,
        password: passenger.password,
        user_id: passenger.user_id,
        role: "passenger"
    }));
    await knex("user_logins").insert(passengerLogins);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    // Drop the user_logins table
    await knex.schema.dropTable("user_logins");
}
