import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const { databaseUrl } = useRuntimeConfig()
const sql = neon(databaseUrl);

export const db = drizzle({ client: sql });
