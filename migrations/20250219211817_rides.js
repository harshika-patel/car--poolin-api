/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("rides", (table) => {
      table.increments("id").primary();
      table.string("from").notNullable();
      table.string("to").notNullable();
      table.date("date").notNullable();
      table.time("time").notNullable();
      table.decimal("price").notNullable();
      table.integer("seats").notNullable();
      table.boolean("is_booked").defaultTo(false); // True when fully booked
      table.integer("booked_seats").defaultTo(0); // Tracks booked seats
      table.integer("driver_id").unsigned().notNullable();
      table.foreign("driver_id").references("drivers.id").onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
  }
  
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("rides");
}
