import { UserTokenPayload } from "coffee-types";

import knex from "../knex";

const TABLE_NAME = "users";

function createSelect() {
  return knex
    .select(["users.id", "users.username", "users.is_barista"])
    .from(TABLE_NAME);
}

export default class User {
  static async findByUsername(username: string): Promise<User | null> {
    const rows: any[] = await createSelect()
      .where({ username })
      .limit(1);
    if (rows.length !== 1) {
      return null;
    }
    const item = new User(rows[0]);
    return item;
  }

  id: string;
  username: string;
  isBarista: boolean;

  constructor(row: any) {
    this.id = row["id"];
    this.username = row["username"];
    this.isBarista = row["is_barista"];
  }

  toJSON(): UserTokenPayload {
    return {
      username: this.username,
      role: this.isBarista ? "barista" : "user"
    };
  }
}
