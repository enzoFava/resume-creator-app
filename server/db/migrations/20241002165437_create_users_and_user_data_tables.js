export async function up(knex){
    return knex.schema.createTable('users', (table) => {
        table.increments("id").primary();
        table.string("google_id").unique();
        table.string("username").notNullable();
        table.string("password").notNullable();
    })
    .createTable('users_data', (table) => {
        table.integer('user_id').references('id').inTable('users');
        table.string("fullname").notNullable();
        table.string("email").unique().notNullable();
        table.text('phone_number').notNullable();
        table.text('address').notNullable();
        table.text('education');
        table.text('experience');
        table.text('skills');
    })
}

export async function down(knex) {
    return knex.schema.dropTableIfExists('users_data').dropTableIfExists('users');
}