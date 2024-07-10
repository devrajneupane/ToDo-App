import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";

import config from "../config";
import { IUser } from "../interface/User";
import { getUserByEmail } from "./userService";
import { signPayload } from "../utils/utils";

/**
 * Login user
 *
 * @param body
 * @returns accessToken and refreshToken
 */
export async function login(body: Pick<IUser, "email" | "password">) {
  const existingUser = getUserByEmail(body.email);

  if (!existingUser) {
    return {
      error: "Invalid email or password",
    };
  }

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password,
  );

  if (!isValidPassword) {
    return {
      error: "Invalid email or password",
    };
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
  };

  return signPayload(payload);
}

/**
 * Generate new tokens from the previous refresh token
 *
 * @param token
 */
export async function refresh(token: string) {
  const { id, email, name } = verify(token, config.jwt.secret!) as Pick<
    IUser,
    "id" | "email" | "name"
  >;

  const payload = {
    id: id,
    email: email,
    name: name,
  };

  return signPayload(payload);
}
