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
          id: "06f44fc3-3b48-4e2e-abfe-b5abab5d933f",
          name: "dave",
          email: "dave@email.com",
          password:
            "$2b$10$EQbCiDl66wfU2Pz38q9B2eB5RByx.KCwHOdqFiWvEmNgQmrzi/HQy",
          permissions: ROLE.ADMIN,
        },
        {
          id: "80b223de-a9c8-437d-b932-8f540452bb45",
          name: "joy",
          email: "joy@email.com",
          password:
            "$2b$10$22i040zW0L44JkPc7cFOOO4U1AABmAUlLbE5HS1vL47mwxYOVx12W",
        },
        {
          id: "9da1e246-03a8-4272-be8e-1cf8f551c68f",
          name: "bob",
          email: "bob@email.com",
          password:
            "$2b$10$mEd2oNuZy.rMp5XQ66qKXeyJSEKcUCYJnAK1hi2ETg3E9mKiFuinO",
        },
        {
          id: "08b8bc54-0439-45f2-ad60-ae3a17d3b0e7",
          name: "maya",
          email: "maya@email.com",
          password:
            "$2b$10$d6w6iAOI3IeJ0CwdfSiwoO2VPBJAHP0QjvPyfr2OtfmOvaz15ufNi",
          permissions: ROLE.ADMIN,
        },
        {
          id: "08b8bc54-0439-45f2-ad60-ae3a17d3b0e8",
          name: "fox",
          email: "fox@email.com",
          password:
            "$2b$10$l8xgyHBdsgOzyWZH1gyZlO8xWY8HhGf8aYISLvKbDNjcjd2oki6Wy",
        },
      ]);
    });
}
