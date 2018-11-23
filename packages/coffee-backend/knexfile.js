module.exports = {
  development: {
    // Note: This must be sqlite3, mysql, or postgresql.
    //  Other databases have differing return values that will
    //  cause undefined behavior.
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3"
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  }
};
