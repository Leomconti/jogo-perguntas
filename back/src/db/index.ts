import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'
import { env } from '../env'

const client = new Pool({
  connectionString: env.DATABASE_URL
})
// Create a Drizzle ORM instance
const db = drizzle(client, { schema })

export { db, client }
