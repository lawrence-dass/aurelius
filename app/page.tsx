import React from 'react'

import MentorCard from '@/components/MentorCard'
import CreateMentor from '@/components/CreateMentor'  
import MentorList from '@/components/MentorList'

import { recentSessions } from '@/constants'

interface Mentor {
  id: number
  name: string
  topic: string
  subject: string
  duration: number
  color: string
}

const mentors = [
  {
    id: 123,
    name: "Marcus Aurelius",
    topic: "On Virtue & Character",
    subject: "virtue",
    duration: 30,
    color: "bg-purple-600"
  },
  {
    id: 124,
    name: "Seneca",
    topic: "Letters on Living Well",
    subject: "letters",
    duration: 25,
    color: "bg-emerald-600"
  },
  {
    id: 125,
    name: "Epictetus",
    topic: "The Discipline of Desire",
    subject: "wisdom",
    duration: 35,
    color: "bg-blue-600"
  }
];

const Page = () => {
  return (
    <main>
      <h1 className='text-2xl underline'> Mentors </h1>
      <section className='home-section'>
        {
          mentors.map((mentor: Mentor) => (
            <MentorCard key={mentor.id} {...mentor} />
          ))
        }
      </section>
      <section className='home-section'>
        <MentorList title="Recent Mentoring Sessions" mentors={recentSessions} classNames="w-2/3 max-lg:w-full"  />
        <CreateMentor />
      </section>
    </main>
  )
}

export default Page