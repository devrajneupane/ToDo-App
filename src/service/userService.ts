import { GetUserQuery, IUser } from "../interface/User";
import bcrypt from "bcrypt";
import * as UserModel from "../model/userModel";
import { getUUID } from "../utils/utils";
import { UUID } from "crypto";

/**
 * Get user info
 *
 * @param id User ID
 * @returns User object
 */
export function getUserInfo(id: UUID) {
  const data = UserModel.getUserInfo(id);

  if (!data) {
    return {
      error: `User with id: ${id} not found`,
    };
  }

  return data;
}

/**
 * Create user
 *
 * @param user User data
 */
export async function createUser(user: IUser) {
  const password = await bcrypt.hash(user.password, 10);
  const userData = {
    id: getUUID(),
    name: user.name,
    email: user.email,
    password: password,
  };

  await UserModel.createUser(userData);

  return {
    message: "User created",
  };
}

/**
 * Update user
 *
 * @param id User ID
 * @param data User data
 * @returns User object
 */
export async function updateUser(id: UUID, data: IUser) {
  const { name, email, password } = data;
  const newUserData: Partial<IUser> = {};

  if (name) newUserData.name = name;
  if (email) newUserData.email = email;
  if (password) newUserData.password = await bcrypt.hash(password, 10);

  return await UserModel.updateUser(id, newUserData);
}

/**
 * Delete user
 *
 * @param id User ID
 * @returns User object
 */
export async function deleteUser(id: UUID) {
  return await UserModel.deleteUser(id);
}

/**
 * Get user by email
 *
 * @param email User email
 * @returns User object
 */
export function getUserByEmail(email: string) {
  const data = UserModel.getUserByEmail(email);

  return data;
}
