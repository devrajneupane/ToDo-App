import { Knex } from "knex";
import { TASK_STATUS } from "../../enums/TaskStatus";

const TABLE_NAME = "tasks";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid("task_id", { primaryKey: true, useBinaryUuid: true });
    table
      .uuid("user_id", { useBinaryUuid: true })
      .references("id")
      .inTable("users")
      .notNullable();

    table.string("title", 100).notNullable();
    table.string("desc", 1000).notNullable();
    table
      .enum("status", Object.values(TASK_STATUS))
      .notNullable()
      .defaultTo(TASK_STATUS.NOTSTARTED);

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

    table
      .uuid("created_by")
      .references("id")
      .inTable("users")
      .nullable();

    table.timestamp("updated_at").nullable();

    table
      .uuid("updated_by")
      .references("id")
      .inTable("users")
      .nullable();
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
