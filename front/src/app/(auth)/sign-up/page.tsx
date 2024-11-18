'use client'

import { Suspense } from 'react'
import SignUpForm from './components/signUpForm'

export default function SignUp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpForm />
    </Suspense>
  )
}
