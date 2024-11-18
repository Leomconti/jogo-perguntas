import { getServerAuthSession } from '@/lib/auth'
import { queryClient } from '@/services/queryClient'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Projects } from './components/projects'
import { getUsage } from '@/requests/payments/getUsage'
import { PricingPage } from '@/components/pricing-page/pricingPage'

export default async function Page() {
  const session = await getServerAuthSession()

  await queryClient.prefetchQuery({
    queryKey: ['getUsage'],
    queryFn: () =>
      getUsage({
        userId: session?.user.id ?? ''
      })
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <Projects />
      <PricingPage />
    </HydrationBoundary>
  )
}
