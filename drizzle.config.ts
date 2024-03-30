import type { Config } from 'drizzle-kit';
import { env } from '@/env';

export default {
  driver: 'pg',
  out: './drizzle',
  schema: './src/utils/db/schema.ts',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;