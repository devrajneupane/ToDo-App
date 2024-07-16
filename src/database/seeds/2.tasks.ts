import { Knex } from "knex";
import { TASK_STATUS } from "../../enums/TaskStatus";

const TABLE_NAME = "tasks";

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
          taskId: "08b8bc54-0439-45f2-ad60-ae3a17d3b0b7",
          userId: "08b8bc54-0439-45f2-ad60-ae3a17d3b0e7",
          title: "Get things done",
          desc: "Do the things that need to be done",
          status: TASK_STATUS.PENDING,
        },
        {
          taskId: "08b8bc54-0439-45f2-ad60-ae3a17d3b0d7",
          userId: "08b8bc54-0439-45f2-ad60-ae3a17d3b0e7",
          title: "Make things happen",
          desc: "Make the things that need to happen happen",
        },
      ]);
    });
}

