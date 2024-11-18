import { z } from 'zod'

export const UpdateUserDTO = z.object({
  name: z.string().optional()
})

export type UpdateUserDTO = z.infer<typeof UpdateUserDTO>
