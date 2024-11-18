import { getServerAuthSession } from '@/lib/auth'
import { ProfileForm } from './components/form'

export default async function Page() {
  const session = await getServerAuthSession()

  const user = session?.user

  return <ProfileForm defaultValues={user!} />
}
