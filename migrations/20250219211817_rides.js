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
      table.integer("driver_id").unsigned().references("id").inTable("drivers").onDelete("CASCADE").notNullable(); // Add driver_id column
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
  