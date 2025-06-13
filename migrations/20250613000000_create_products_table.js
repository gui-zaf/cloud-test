exports.up = function(knex) {
  return knex.schema.createTable('product', function(table) {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.text('description');
    table.decimal('price', 10, 2).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('product');
}; 