import React from 'react'

import MentorCard from '@/components/MentorCard'
import MentorList from '@/components/MentorList'

import { getMentors, getRecentSessions } from '@/lib/actions/mentor.actions'
import Link from 'next/link'
import { Button } from "@/components/ui/button"


const Page = async () => {
  const mentors = await getMentors({ limit: 3});
  
  const recentSessions = await getRecentSessions(3);

  return (
    <main>
      <h1 className='text-4xl font-bold'> Mentors </h1>
      <section className='home-section'>
        {
          mentors.map((mentor) => (
            <MentorCard key={mentor.id} {...mentor} />
          ))
        }
      </section>
      <Button asChild className="btn-primary flex justify-center items-center">
        <Link href="/mentors/new">Create a New Mentor</Link>
      </Button>
      <section>
        {recentSessions.length > 0 && <MentorList mentors={recentSessions}  />}
      </section>
    </main>
  )
}

export default Page
