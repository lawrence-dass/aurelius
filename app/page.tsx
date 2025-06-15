import React from 'react'

import MentorCard from '@/components/MentorCard'
import MentorList from '@/components/MentorList'

import { getMentors, getRecentSessions } from '@/lib/actions/mentor.actions'
import Link from 'next/link'
import { Button } from "@/components/ui/button"


const Page = async () => {
  const mentors = await getMentors({ limit: 3});
  console.log('mentors', mentors)
  
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


// TODO:
// - [ ] fix subscription issue
// - [ ] check the mentor privacy concern
// - [ ] fix the mentor voice issue and mentor id issue
// - [ ] remove feild base on the testing and use case
// - [ ] fix the getMentors and display them in
// - [ ] fix the bookmark on the dashboard
