import uuidV4 from "uuid/v4";

export const SESSION_KEY = process.env.SESSION_KEY || uuidV4();
