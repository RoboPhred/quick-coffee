// Data storage for users.
//  TODO: Database, real user creation, integration with AD, so on.

export interface User {
  username: string;
  role: "user" | "barista";
}

const users: Record<string, User> = {};

export async function findUserByUsername(
  username: string
): Promise<User | null> {
  const user = users[username];

  if (!user) {
    return null;
  }
  return user;
}

export async function createUser(username: string): Promise<User> {
  if (users[username]) {
    throw new Error("Username already in use.");
  }

  // TODO: Remove default admin.  Replace with method of creating default account on startup.
  const user: User = { username, role: "barista" };

  users[username] = user;
  return user;
}
