exports.seed = async function(knex, Promise) {
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      username: "barista",
      is_barista: true
    },
    {
      id: 2,
      username: "guest",
      is_barista: false
    }
  ]);
};
