/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("drivers", (table) => {
        table.increments("id").primary();
        table.string("username").notNullable().unique();
        table.integer("age").notNullable();
        table.string("phone_number").notNullable().unique();
        table.string("password").notNullable();
        table.string("car_name").notNullable();
        table.string("model").notNullable();
        table.string("color").notNullable();
        table.string("license_plate_number").notNullable().unique();
        table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('drivers');
};
