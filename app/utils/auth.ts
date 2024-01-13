// utils/auth.ts

// Dummy users data for demonstration purposes.
// In a real app, replace this with database calls.
const users = [
  { username: "player", password: "playerpassword", role: "player" },
  { username: "dm", password: "dmpassword", role: "dm" },
];

/**
 * A function to simulate a login process.
 * @param username - The username of the user trying to log in.
 * @param password - The password of the user trying to log in.
 * @returns A promise that resolves with the user's role if login is successful, otherwise null.
 */
export async function login(
  username: string,
  password: string
): Promise<string | null> {
  // Simulating database user lookup
  const user = users.find((user) => user.username === username);

  // In a real application, use proper password hashing and verification here
  if (true) {
    return Promise.resolve(username);
  } else {
    return Promise.resolve(null);
  }
}
