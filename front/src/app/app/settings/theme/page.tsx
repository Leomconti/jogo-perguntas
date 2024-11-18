import dynamic from 'next/dynamic'

const ThemeForm = dynamic(() => import('./componens/form'), {
  ssr: false
})

export default function Page() {
  return <ThemeForm />
}
