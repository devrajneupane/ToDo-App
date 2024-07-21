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
          task_id: "08b8bc54-0439-45f2-ad60-ae3a17d3b0b7",
          user_id: "9da1e246-03a8-4272-be8e-1cf8f551c68f",
          title: "Get things done",
          desc: "Do the things that need to be done",
          status: TASK_STATUS.PENDING,
        },
        {
          task_id: "08b8bc54-0439-45f2-ad60-ae3a17d3b0d7",
          user_id: "80b223de-a9c8-437d-b932-8f540452bb45",
          title: "Make things happen",
          desc: "Make the things that need to happen happen",
        },
      ]);
    });
}

