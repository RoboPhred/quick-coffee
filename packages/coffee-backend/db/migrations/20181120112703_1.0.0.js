exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("menu_items", function(table) {
      table.uuid("id").primary();
      table.string("name").notNullable();
    })
    .createTable("users", function(table) {
      table.uuid("id").primary();
      table.string("username").notNullable();
      table.index("username");
      table
        .boolean("is_barista")
        .notNullable()
        .defaultTo(false);

      table.unique("username");
    })
    .createTable("user_favorites", function(table) {
      table.uuid("id").primary();
      table.string("name").notNullable();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("users.id");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("user_orders", function(table) {
      table.uuid("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("users.id");
      table
        .string("menu_item_id")
        .notNullable()
        .references("menu_items.id");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.string("status").notNullable();
      table.timestamp("status_updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("menu_items")
    .dropTable("users")
    .dropTable("user_favorites")
    .dropTable("user_orders");
};
