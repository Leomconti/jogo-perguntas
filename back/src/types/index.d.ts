import { SelectUser } from '../db/schema'

declare global {
  namespace Express {
    interface Request {
      rawBody?: string
    }
    interface User extends SelectUser {}
  }
}
