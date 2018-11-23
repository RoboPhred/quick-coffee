import knex from "../knex";
import { UserTokenPayload } from "coffee-types";

export default class User {
  static async findByUsername(username: string): Promise<User | null> {
    const rows: any[] = await knex
      .select(["id", "username", "is_barista"])
      .from("users")
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
