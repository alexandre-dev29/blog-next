import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export class DbConnection {
  private static INSTANCE: NodePgDatabase<typeof schema>;

  static instance(): NodePgDatabase<typeof schema> {
    if (!DbConnection.INSTANCE) {
      const connectionString = `${process.env.DATABASE_URL}`;
      const pool = new Pool({ connectionString });
      // const client = postgres(connectionString);
      DbConnection.INSTANCE = drizzle(pool, { schema });
    }
    return DbConnection.INSTANCE;
  }
}
