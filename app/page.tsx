import React from 'react'

import MentorCard from '@/components/MentorCard'
import MentorList from '@/components/MentorList'

import { recentSessions } from '@/constants'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

import { Mentor } from '@/types'

const mentors = [
  {
    id: 123,
    name: "Marcus Aurelius",
    focus: "On Virtue & Character",
    practice: "virtue",
    duration: 30,
    color: "bg-purple-600"
  },
  {
    id: 124,
    name: "Seneca",
    focus: "Letters on Living Well",
    practice: "letters",
    duration: 25,
    color: "bg-emerald-600"
  },
  {
    id: 125,
    name: "Epictetus",
    focus: "The Discipline of Desire",
    practice: "wisdom",
    duration: 35,
    color: "bg-blue-600"
  }
];

const Page = () => {
  return (
    <main>
      <h1 className='text-4xl font-bold'> Mentors </h1>
      <section className='home-section'>
        {
          mentors.map((mentor: Mentor) => (
            <MentorCard key={mentor.id} {...mentor} />
          ))
        }
      </section>
      <Button asChild className="btn-primary flex justify-center items-center">
        <Link href="/mentors/new">Create a New Mentor</Link>
      </Button>
      <section>
        <MentorList mentors={recentSessions}  />
      </section>
    </main>
  )
}

export default Page


// TODO:
// - [ ] fix subscription issue
// - [ ] check the mentor privacy concern
// - [ ] fix the mentor voice issue and mentor id issue