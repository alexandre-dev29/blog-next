const { drizzle } = require('drizzle-orm/postgres-js');
const { migrate } = require('drizzle-orm/postgres-js/migrator');
const postgres = require('postgres');
require('dotenv').config();

const connectionString = `${process.env.DATABASE_URL}`;
const client = postgres(connectionString);
const db = drizzle(client);
(async function () {
  await migrate(db, { migrationsFolder: './db/src/drizzle' });
})();
