import * as path from "path";
import { UUID } from "crypto";

import { ROLE } from "../enums/Role";
import { NotFound } from "../error/NotFound";
import loggerWithNameSpace from "../utils/logger";
import { GetUserQuery, IUser } from "../interface/User";
import { getUUID, readJsonFile, writeJsonFile } from "../utils/utils";

const logger = loggerWithNameSpace(__filename);
const usersFilePath = path.resolve(__dirname, "../../data/users.json");

let users: IUser[] = [];

readJsonFile(usersFilePath)
  .then((jsonData) => {
    users = jsonData;
  })
  .catch((error) => {
    throw new Error("Error reading JSON file");
  });

/**
 * Get user info
 *
 * @param id User ID
 * @returns User object if found
 */
export function getUserInfo(id: UUID): Omit<IUser, "password"> {
  const user = users.find(({ id: userId }) => userId === id);
  if (!user) {
    throw new NotFound(`User with id ${id} not found`);
  }

  const { password, ...userInfo } = user;

  return userInfo;
}

/**
 * Get all users
 *
 * @param user User data
 * @returns User object if found or null
 */
export function createUser(user: Omit<IUser, "id">): Omit<IUser, "password"> {
  logger.info("Creating a User");
  if (
    !user ||
    !user.name ||
    !user.email ||
    !user.password ||
    user.name.length == 0 ||
    user.email.length == 0 ||
    user.password.length == 0
  ) {
    throw new Error("Invalid User details");
  }

  const userExists = users.find(({ email }) => email === user.email);
  if (userExists) {
    throw new Error("User with same email already exists");
  }

  const userData = {
    id: getUUID(),
    ...user,
    permissions: [ROLE.USER],
  };

  users.push(userData);

  writeJsonFile(usersFilePath, users)
    .then(() => {
      logger.info("JSON file has been written successfully!");
    })
    .catch((error) => {
      logger.error(error.message);
    });
  const { password, ...userInfo } = userData;
  return userInfo;
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
): Omit<IUser, "password"> {
  const index = users.findIndex(({ id: userId }) => userId === id);
  if (index === -1) {
    throw new Error(`User with id ${id} does not exists`);
  }

  users[index] = { ...users[index], ...userData };

  writeJsonFile(usersFilePath, users)
    .then(() => {
      logger.info("JSON file has been written successfully!");
    })
    .catch((error) => {
      logger.error(error.message);
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
export function deleteUser(id: UUID): Omit<IUser, "password"> {
  const index = users.findIndex(({ id: userId }) => userId === id);
  if (index === -1) {
    throw new Error(`User with id ${id} does not exists`);
  }

  const userData = users[index];
  users.splice(index, 1);

  writeJsonFile(usersFilePath, users)
    .then(() => {
      logger.info("JSON file has been written successfully!");
    })
    .catch((error) => {
      logger.error(error.message);
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
export function getUserByEmail(email: string): IUser {
  const user = users.find(({ email: userEmail }) => userEmail === email);
  if (!user) {
    throw new Error(`User with email ${email} does not exists`);
  }
  return user;
}
