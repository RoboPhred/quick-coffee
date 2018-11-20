exports.seed = async function(knex, Promise) {
  await knex("users").del();
  await knex("users").insert([
    {
      id: "2ecf6562-9c39-4b63-9e27-b32c72b6347d",
      username: "barista",
      is_barista: true
    },
    {
      id: "e9238ede-25ff-483b-b915-871990cad1f1",
      username: "guest",
      is_barista: false
    }
  ]);
};
