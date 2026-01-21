/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('leads', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('mobile').notNullable();
        table.string('postcode').notNullable();
        table.specificType('interests', 'text[]').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTableIfExists('leads');
}