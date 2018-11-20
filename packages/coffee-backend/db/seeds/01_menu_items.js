exports.seed = async function(knex, Promise) {
  await knex("menu_items").del();
  await knex("menu_items").insert([
    { id: "976afb5f-89f4-42df-be4a-500f57d1a1ff", name: "Coffee" },
    { id: "9c8f4d16-0287-405a-819e-2d6d55b6ffcd", name: "Hot Chocolate" }
  ]);
};
