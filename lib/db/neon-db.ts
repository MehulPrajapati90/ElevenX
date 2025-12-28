import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "@/schema"

export const client = drizzle(process.env.DATABASE_URL || "", {
    schema: schema
});