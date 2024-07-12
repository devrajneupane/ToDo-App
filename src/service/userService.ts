import { UUID } from "crypto";

import bcrypt from "bcrypt";

import { getUUID } from "../utils/utils";
import * as UserModel from "../model/userModel";
import { GetUserQuery, IUser } from "../interface/User";

/**
 * Get user info
 *
 * @param id User ID
 * @returns User object
 */
export async function getUserInfo(id: UUID) {
  const data = await UserModel.getUserInfo(id);

  return {
    message: "User info retrieved successfully",
    data,
  };
}

/**
 * Create user
 *
 * @param user User data
 */
export async function createUser(user: IUser) {
  const password = await bcrypt.hash(user.password, 10);

  const data = await UserModel.createUser({
    ...user,
    password: password,
  });

  return {
    message: "User created successfully",
    data,
  };
}

/**
 * Update user
 *
 * @param id User ID
 * @param userData User data
 * @returns User object
 */
export async function updateUser(id: UUID, userData: IUser) {
  const { name, email, password } = userData;
  const newUserData: Partial<IUser> = {};

  if (name) newUserData.name = name;
  if (email) newUserData.email = email;
  if (password) newUserData.password = await bcrypt.hash(password, 10);

  const data = await UserModel.updateUser(id, newUserData);

  return {
    message: "User updated successfully",
    data,
  };
}

/**
 * Delete user
 *
 * @param id User ID
 * @returns User object
 */
export async function deleteUser(id: UUID) {
  const data = await UserModel.deleteUser(id);

  return {
    message: "User deleted successfully",
    data,
  };
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
