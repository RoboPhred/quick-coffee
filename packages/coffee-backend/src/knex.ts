import { NODE_ENV } from "./config";

import makeKnex from "knex";

const knexConfig = require("../knexfile.js")[NODE_ENV];
const knex = makeKnex(knexConfig);
export default knex;
