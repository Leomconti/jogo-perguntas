import { motion } from 'framer-motion'

interface CursorProps {
  position: {
    left: number
    width: number
    opacity: number
  }
}

export function Cursor({ position }: CursorProps) {
  return (
    <motion.li
      animate={{
        ...position
      }}
      className="bg-glass-gradient absolute z-0 hidden h-7 rounded-full bg-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-lg backdrop-filter sm:block md:h-10"
    />
  )
}
