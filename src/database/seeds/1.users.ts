import { Knex } from "knex";
import { ROLE } from "../../enums/Role";

const TABLE_NAME = "users";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          id: "08b8bc54-0439-45f2-ad60-ae3a17d3b0e7",
          name: "bob",
          email: "bob@email.com",
          password: "hashed_Password",
          permissions: ROLE.ADMIN,
        },
        {
          id: "08b8bc54-0439-45f2-ad60-ae3a17d3b0e8",
          name: "joy",
          email: "joi@email.com",
          password: "hashed_Passw00ord",
        },
      ]);
    });
}

