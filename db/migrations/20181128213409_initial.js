exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("projects", table => {
      table.increments("id").primary();
      table.string("name");

      table.timestamps(true, true);
    }),

    knex.schema.createTable("colors", table => {
      table.increments("id").primary();
      table.integer("project_id").unsigned();
      table.foreign("project_id").references("projects.id");
      table.string("name");
      table.string("color_1");
      table.string("color_2");
      table.string("color_3");
      table.string("color_4");
      table.string("color_5");

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema("projects"), 
    knex.schema("colors")
  ]);
};
