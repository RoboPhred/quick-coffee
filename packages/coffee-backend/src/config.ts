import uuidV4 from "uuid/v4";

export const JWT_KEY = process.env.JWT_KEY || uuidV4();

export const NODE_ENV = process.env.NODE_ENV || "development";