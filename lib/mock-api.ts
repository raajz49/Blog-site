import { Post, User } from "./type";

let users: User[] = [
  {
    id: "1",
    email: "demo@example.com",
    name: "Demo User",
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authAPI = {
  login: async (
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> => {
    await delay(500);

    if (email === "demo@example.com" && password === "password123") {
      const user = users.find((u) => u.email === email) || users[0];
      return {
        user,
        token: `mock-jwt-token-${user.id}`,
      };
    }

    const user = users.find((u) => u.email === email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    return {
      user,
      token: `mock-jwt-token-${user.id}`,
    };
  },

  register: async (
    email: string,
    password: string,
    name: string
  ): Promise<{ user: User; token: string }> => {
    await delay(500);

    if (users.find((u) => u.email === email)) {
      throw new Error("Email already exists");
    }

    const newUser: User = {
      id: String(users.length + 1),
      email,
      name,
    };

    users.push(newUser);
    return {
      user: newUser,
      token: `mock-jwt-token-${newUser.id}`,
    };
  },

  getCurrentUser: async (token: string): Promise<User | null> => {
    await delay(300);

    const userId = token.replace("mock-jwt-token-", "");
    const user = users.find((u) => u.id === userId);
    return user || null;
  },
};

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "First Mock Post",
    content: "This is a simple mock post content.",
    author: "Raj Koirala",
    authorId: "1",
    tags: ["mock", "blog"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Second Mock Post",
    content: "Another example post content.",
    author: "Raj Koirala",
    authorId: "1",
    tags: ["example"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
