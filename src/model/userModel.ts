import { UUID } from "crypto";

import { BaseModel } from "./Base";
import { ROLE } from "../enums/Role";
import { getUUID } from "../utils/utils";
import { NotFound } from "../error/NotFound";
import { IGetUserQuery, IUser } from "../interface/User";
import { ConflictError } from "../error/ConflictError";

const TABLE_NAME = "users"

/**
 * UserModel class represents operations related to user management
 * Extends BaseModel for common functionalities
 */
export class UserModel extends BaseModel {
  /**
   * Retrieves a list of users based on filter criteria
   *
   * @param filter Filter criteria including search query, page, and size
   * @returns users
   */
  static async getUsers(filter: IGetUserQuery) {
    const { q } = filter;

    const users = this.connection<IUser>(TABLE_NAME)
      .select("id", "name", "email", "permissions")
      .limit(filter.size || 10)
      .offset((filter.page || 1 - 1) * (filter.size || 10));

    if (q) {
      users.whereLike("name", `%${q}%`);
    }

    return users;
  }

  /**
   * Retrieves user information by user ID
   *
   * @param  id User ID.
   * @returns  User object excluding password if found
   * @throws NotFound error if user with provided ID does not exist
   */
  static async getUserInfo(id: UUID): Promise<Omit<IUser, "password">> {
    const user = await this.connection<IUser>(TABLE_NAME).where({ id }).first();
    if (!user) {
      throw new NotFound(`User with id ${id} not found`);
    }

    const { password, ...userInfo } = user;

    return userInfo;
  }

  /**
   * Creates a new user
   *
   * @param user User data excluding ID
   * @returns Newly created user object excluding password
   * @throws Error if user with the same email already exists
   */
  static async createUser(
    user: Omit<IUser, "id">,
  ): Promise<Omit<IUser, "password">> {
    const userToCreate = {
      id: getUUID(),
      ...user,
      permissions: [ROLE.USER],
    };

    const query = await this.queryBuilder()
      .table(TABLE_NAME)
      .where({ email: user.email });

    if (query.length !== 0) {
      throw new ConflictError("User with same email already exists");
    }

    await this.queryBuilder().insert(userToCreate).table(TABLE_NAME);

    const { password, ...userInfo } = userToCreate;
    return userInfo;
  }

  /**
   * Updates an existing user
   *
   * @param id User ID
   * @param userData Partial user data to update
   * @returns Updated user object excluding password if found
   * @throws Error if user with provided ID does not exist
   */
  static async updateUser(
    id: UUID,
    userData: Partial<IUser>,
  ): Promise<Omit<IUser, "password">> {
    const query = await this.queryBuilder().table(TABLE_NAME).where({ id });
    if (query.length === 0) {
      throw new NotFound(`User with id ${id} does not exists`);
    }

    await this.queryBuilder().update(userData).table(TABLE_NAME).where({ id });

    const updatedUser = await this.connection<IUser>(TABLE_NAME)
      .where({ id })
      .first();

    const { password, ...userInfo } = updatedUser!;
    return userInfo;
  }

  /**
   * Deletes a user by ID
   *
   * @param id User ID
   * @returns Deleted user object excluding password if found
   * @throws Error if user with provided ID does not exist
   */
  static async deleteUser(id: UUID): Promise<Omit<IUser, "password">> {
    const user = await this.connection<IUser>(TABLE_NAME).where({ id }).first();
    if (!user) {
      throw new NotFound(`User with id ${id} does not exists`);
    }

    await this.queryBuilder().del().table(TABLE_NAME).where({ id });

    const { password, ...userInfo } = user!;
    return userInfo;
  }

  /**
   * Retrieves user by email
   *
   * @param email User email
   * @returns User object if found
   * @throws Error if user with provided email does not exist
   */
  static async getUserByEmail(email: string): Promise<IUser> {
    const user = await this.connection<IUser>(TABLE_NAME).where({ email }).first();
    if (!user) {
      throw new NotFound(`User with email ${email} does not exists`);
    }
    return user;
  }
}
