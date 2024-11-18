'use client'
import { cn } from '@/lib/utils'
import Marquee from '@/components/ui/marquee'
import { ReviewCard } from './ReviewCard'
import { reviews } from './data'

const chunk = (arr: any[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  )

const cols = chunk(reviews, reviews.length / 3)

export function Reviews() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg">
      <h1 className="mb-8 text-center text-5xl font-extrabold">
        O Que Nossos Clientes Estão Falando
      </h1>
      <div className="relative grid h-[600px] grid-flow-col flex-row items-center justify-center overflow-hidden">
        {cols.map((col, index) => (
          <Marquee
            key={index}
            reverse={index % 2 == 0}
            pauseOnHover
            vertical
            className="[--duration:70s]"
          >
            {col.map((review) => (
              <ReviewCard key={review.username} {...review} index={index} />
            ))}
          </Marquee>
        ))}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background dark:from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background dark:from-background"></div>
      </div>
    </section>
  )
}
