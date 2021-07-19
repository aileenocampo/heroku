
exports.up = function(knex) {
  return knex.schema.createTable('data', table => {
    table.increments('id'); // adds an auto incrementing PK column
    table.string('name').notNullable();
    table.integer('servings');
    table.string('image_url');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('data');
};