import React from 'react'

import MentorCard from '@/components/MentorCard'
import MentorList from '@/components/MentorList'

import { getMentors, getRecentSessions } from '@/lib/actions/mentor.actions'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { currentUser } from '@clerk/nextjs/server'


const Page = async () => {
  const mentors = await getMentors({ limit: 3 });
  const user = await currentUser();
  const recentSessions = user ? await getRecentSessions(user.id as string) : [];
  return (
    <main>
      <h1 className='text-4xl font-bold'> Mentors </h1>
      <h2></h2>
      <section className='home-section'>
        {
          mentors.map((mentor) => (
            <MentorCard key={mentor.id} {...mentor} />
          ))
        }
      </section>
      {user && (
        <Button asChild className="btn-primary flex justify-center items-center">
          <Link href="/mentors/new">Create a New Mentor</Link>
        </Button>
      )}
      {!user && (
        <Button asChild className="btn-primary flex justify-center items-center">
          <Link href="/sign-in">Sign in to unlock all features</Link>
        </Button>
      )}
      <section>
        {recentSessions.length > 0 && <MentorList list={recentSessions} />}
      </section>
    </main>
  )
}

export default Page
