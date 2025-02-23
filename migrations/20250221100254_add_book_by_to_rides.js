export async function up(knex) {
    return knex.schema.alterTable('rides', function(table) {
      table.integer('book_by').unsigned().nullable().references('id').inTable('passengers').onDelete('SET NULL');
    });
  };
  
  export async function down(knex) {
    return knex.schema.alterTable('rides', function(table) {
      table.dropColumn('book_by');
    });
  };
  