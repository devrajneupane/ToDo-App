import bcrypt from "bcrypt";
import { verify } from "jsonwebtoken";

import { env } from "../config";
import { IUser } from "../interface/User";
import { signPayload } from "../utils/utils";
import { getUserByEmail } from "./userService";
import { UnauthorizedError } from "../error/UnauthorizedError";

/**
 * Login user
 *
 * @param body login details
 * @returns accessToken and refreshToken
 */
export async function login(body: Pick<IUser, "email" | "password">) {
  const existingUser = await getUserByEmail(body.email);

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password,
  );

  if (!isValidPassword) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    permissions: existingUser.permissions,
  };

  return signPayload(payload);
}

/**
 * Generate new tokens from the previous refresh token
 *
 * @param token
 */
export async function refresh(token: string) {
  const { id, email, name, permissions } = verify(
    token,
    env.jwt.secret!,
  ) as Pick<IUser, "id" | "email" | "name" | "permissions">;

  const payload = {
    id: id,
    email: email,
    name: name,
    permissions: permissions,
  };

  return signPayload(payload);
}
