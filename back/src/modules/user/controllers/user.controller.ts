import { NextFunction, Request, Response } from 'express'
import { UpdateUserDTO } from '../dtos/user.dto'
import { db } from '../../../db'
import { users } from '../../../db/schema'
import { eq } from 'drizzle-orm'
import { AppError } from '../../../utils/errorHandler'

export class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id

      const [user] = await db.select().from(users).where(eq(users.id, userId))

      if (!user) {
        throw new AppError('User not found', 404)
      }

      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!
      const { id } = req.params
      const { name } = UpdateUserDTO.parse(req.body)

      const [targetUser] = await db.select().from(users).where(eq(users.id, id))

      if (!targetUser) {
        throw new AppError('Usuario nao encontrado', 404)
      }

      const isDifferentUser = user.id !== targetUser.id

      if (isDifferentUser)
        throw new AppError('Voce nao pode atualizar este usuario', 401)

      const updatedUser = await db
        .update(users)
        .set({
          name
        })
        .where(eq(users.id, id))
        .returning()

      res.json(updatedUser[0])
    } catch (error) {
      next(error)
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const targetUserId = req.params.id
      const user = req.user!

      const [targetUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, targetUserId))

      if (!targetUser) {
        throw new AppError('Usuario nao encontrado', 404)
      }

      if (user.id !== targetUser.id) {
        throw new AppError('Voce nao pode deletar este usuario', 401)
      }

      await db.delete(users).where(eq(users.id, targetUserId))

      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
