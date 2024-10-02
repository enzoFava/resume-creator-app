export default {
    development: {
        client: 'pg',
        connection: 'postgresql://postgres:pacleinad@localhost:5432/postgres',
        migrations: {
            directory: "./db/migrations",
        }
    }
}