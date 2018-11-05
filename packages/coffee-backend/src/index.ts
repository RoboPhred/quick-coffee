import express from "express";
import express_graphql from "express-graphql";
import cors from "cors";

import { buildSchema } from "graphql";

import {
  InventoryItem,
  InventoryItemSchema,
  ItemOptionSchema
} from "coffee-types";

const TEST_DELAY = 200;

// GraphQL schema
// Might want to investigate https://github.com/19majkel94/type-graphql
const schema = buildSchema(`
  type Query {
    open: Boolean!
    items: [InventoryItem!]!
  }
  ${InventoryItemSchema}
  ${ItemOptionSchema}
`);

// Root resolver
const root = {
  async open(): Promise<boolean> {
    await testDelay();
    return true;
  },
  async items(): Promise<InventoryItem[]> {
    return [
      {
        id: "coffee",
        name: "Coffee",
        description: "Basic unspecified coffee",
        // Tracking sizes as first-class, so we can summarize all orders
        //  on size and give some guidance to how much to make.
        sizes: ["Small", "Medium", "Large"],
        options: [
          {
            name: "Creamer",
            type: "select",
            choices: ["None", "Hazelnut", "French Vanilla"],
            default: "None"
          },
          {
            name: "Expresso Shots",
            type: "integer",
            default: 0
          },
          {
            name: "Kaluah",
            type: "boolean"
          },
          {
            name: "Some Text Field",
            type: "text"
          }
        ]
      },
      {
        id: "hot-chocolate",
        name: "Hot Chocolate",
        options: [
          {
            name: "Whipped Cream",
            type: "boolean",
            default: true
          }
        ]
      }
    ];
  }
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use(cors());
app.use(
  "/graphql",
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000, () =>
  console.log("Express GraphQL Server Now Running On localhost:4000/graphql")
);

// Temporary test funcion to ensure our ui plays nice with simulated network delays.
function testDelay(): Promise<void> {
  return new Promise(accept => {
    setTimeout(accept, TEST_DELAY);
  });
}
