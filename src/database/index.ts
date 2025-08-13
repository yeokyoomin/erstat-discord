import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import * as conf from '../config'

if (!conf.config.db_url) throw new Error('DATABASE_URL is not set');

const client = postgres(conf.config.db_url);

export const db = drizzle(client, { schema });
