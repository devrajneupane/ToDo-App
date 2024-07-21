import { Knex } from "knex";

const TABLE_NAME = "tasks";

/**
 * Alter table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropForeign("user_id");
    table.dropForeign("created_by");

    table
      .uuid("user_id", { useBinaryUuid: true })
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable()
      .alter();

    table
      .uuid("created_by")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .nullable()
      .alter();
  });
}

/**
 * Alter table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropForeign("user_id");
    table.dropForeign("created_by");

    table
      .uuid("user_id", { useBinaryUuid: true })
      .references("id")
      .inTable("users")
      .notNullable()
      .alter();

    table
      .uuid("created_by")
      .references("id")
      .inTable("users")
      .nullable()
      .alter();
  });
}
