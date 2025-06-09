import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div>
      <h1>Aurelius: Real-time Stoic guidance at your fingertips. Get personalized wisdom from ancient philosophy for modern challenges, 24/7. Practice daily reflections, navigate difficult situations, and build resilience with on-demand mentorship rooted in Stoic principles.</h1>
      <Button> Seek Wisdom </ Button>
      <Link href="/sign-in"> Sign In </Link>
      <Link href="/mentor"> Mentor </Link>
      <Link href="/my-journey"> My Journey </Link>
      <Link href="/subscription"> Subscription </Link>
      <Link href="/mentor/new"> New Mentor </Link>
    </div>
  )
}

export default Page