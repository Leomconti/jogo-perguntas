'use client'
import { useRef } from 'react'

export function Tab({
  children,
  setPosition
}: {
  children: React.ReactNode
  setPosition: ({
    left,
    width,
    opacity
  }: {
    left: number
    width: number
    opacity: number
  }) => void
}) {
  const ref = useRef<HTMLLIElement>(null)

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return
        const { width } = ref.current.getBoundingClientRect()
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1
        })
      }}
      className="relative z-10 block cursor-pointer select-none px-5 py-2 text-base ring-0 focus-within:ring-0 focus:ring-0"
    >
      {children}
    </li>
  )
}
