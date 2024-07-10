import * as path from "path";

import { readJsonFile, writeJsonFile } from "../utils/utils";
import { GetUserQuery, IUser } from "../interface/User";
import { UUID } from "crypto";

const usersFilePath = path.resolve(__dirname, "../../data/users.json");

let users: IUser[] = [];

readJsonFile(usersFilePath)
  .then((jsonData) => {
    users = jsonData;
  })
  .catch((err) => {
    console.error("Error reading JSON file:", err);
  });

/**
 * Get user info
 *
 * @param id User ID
 * @returns User object if found or null
 */
export function getUserInfo(id: UUID): Omit<IUser, "password"> | null {
  const user = users.find(({ id: userId }) => userId === id);
  if (!user) return null;

  const { password, ...userInfo } = user;

  return userInfo;
}

/**
 * Get all users
 *
 * @param user User data
 * @returns User object if found or null
 */
export function createUser(user: IUser): IUser {
  const userExists = users.find(({ email }) => email === user.email);
  if (userExists) {
    throw new Error("User already exists");
  }

  users.push(user);

  writeJsonFile(usersFilePath, users)
    .then(() => {
      console.log("JSON file has been written successfully!");
    })
    .catch((err) => {
      console.error("Error writing JSON file:", err);
    });
  return user;
}

/**
 * Update user
 *
 * @param id User ID
 * @param userData User data
 * @returns User object if found or null
 */
export function updateUser(
  id: UUID,
  userData: Partial<IUser>,
): Omit<IUser, "password"> | null {
  const index = users.findIndex(({ id: userId }) => userId === id);
  if (index === -1) return null;

  users[index] = { ...users[index], ...userData };

  writeJsonFile(usersFilePath, users)
    .then(() => {
      console.log("JSON file has been written successfully!");
    })
    .catch((err) => {
      console.error("Error writing JSON file:", err);
    });

  const { password, ...userInfo } = users[index];
  return userInfo;
}

/**
 * Delete user
 *
 * @param id User ID
 * @returns User object if found or null
 */
export function deleteUser(id: UUID): Omit<IUser, "password"> | null {
  const index = users.findIndex(({ id: userId }) => userId === id);
  if (index === -1) return null;

  const userData = users[index];
  users.splice(index, 1);

  writeJsonFile(usersFilePath, users)
    .then(() => {
      console.log("JSON file has been written successfully!");
    })
    .catch((err) => {
      console.error("Error writing JSON file:", err);
    });

  const { password, ...userInfo } = userData;
  return userInfo;
}

/**
 * Get user by email
 *
 * @param email User email
 * @returns User object if found or null
 */
export function getUserByEmail(email: string): IUser | null {
  const user = users.find(({ email: userEmail }) => userEmail === email);
  if (!user) return null;
  return user;
}
