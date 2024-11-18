import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import { reviews } from './data'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Fragment } from 'react'

type ReviewCardProps = (typeof reviews)[0] & {
  index: number
}

export function ReviewCard({
  username,
  star,
  review,
  image,
  profession,
  index,
  highlight
}: ReviewCardProps) {
  return (
    <Card
      className={cn(
        index === 1 && 'hidden md:block',
        index === 2 && 'hidden lg:block'
      )}
    >
      <CardContent className="pt-6">
        <p className="mb-3 max-w-80">
          {review.split(highlight).map((part, i) => (
            <Fragment key={i}>
              {i > 0 && (
                <span className="rounded-sm bg-primary px-1 font-bold text-primary-foreground">
                  {highlight}
                </span>
              )}
              {part}
            </Fragment>
          ))}
        </p>
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={cn(
                'fill-[#facc15] text-[#facc15]',
                index > star && 'fill-muted text-muted brightness-90'
              )}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <img
            className="h-12 w-12 rounded-full object-cover"
            width="32"
            height="32"
            alt=""
            src={image}
          />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium leading-tight">{username}</p>
            <span className="text-xs text-muted-foreground">{profession}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
