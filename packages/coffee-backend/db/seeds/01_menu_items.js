exports.seed = async function(knex, Promise) {
  await knex("menu_items").del();
  await knex("menu_items").insert([
    {
      id: 1,
      name: "Coffee",
      options: JSON.stringify([
        {
          id: "creamer",
          name: "Creamer",
          type: "select",
          choices: ["None", "Hazelnut", "French Vanilla"],
          default: "None"
        },
        {
          id: "espresso-shots",
          name: "Espresso Shots",
          type: "integer",
          default: 0
        },
        {
          id: "hot",
          name: "Hot",
          type: "boolean"
        },
        {
          id: "foobar",
          name: "Foobar",
          type: "text",
          placeholder: "This is a placeholder"
        }
      ])
    },
    {
      id: 2,
      name: "Hot Chocolate",
      options: null
    }
  ]);
};
