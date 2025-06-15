import React from 'react'

import MentorCard from '@/components/MentorCard'
import MentorList from '@/components/MentorList'

import { getRecentSessions } from '@/lib/actions/mentor.actions'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

import { Mentor } from '@/types'

  const mentors: Mentor[] = [  
      {
        id: "marcus-aurelius-001",
        name: "Marcus Aurelius",
        title: "The Philosopher Emperor",
        famousQuote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
        qualities: [
          "reflective",
          "humble",
          "dutiful",
          "contemplative",
          "resilient"
        ],
        primaryVirtue: "wisdom",
        secondaryVirtues: ["justice", "temperance"],
        duration: 3,
        practices: [
          "meditation",
          "journaling",
          "contemplation",
          "morning-reflection"
        ],
        specialties: [
          "dealing-with-adversity",
          "leadership-under-pressure",
          "finding-inner-peace",
          "accepting-fate"
        ],
        mentorType: "default",
        style: "classical",
        voice: "male"
      },
      {
        id: "seneca-001",
        name: "Seneca",
        title: "The Practical Philosopher",
        famousQuote: "Every new thing excites the mind, but a mind that seeks truth turns from everything new to what is old and tried.",
        qualities: [
          "practical",
          "eloquent",
          "wealthy-yet-wise",
          "diplomatic",
          "analytical"
        ],
        primaryVirtue: "temperance",
        secondaryVirtues: ["wisdom", "courage"],
        duration: 3,
        practices: [
          "journaling",
          "ethical-review",
          "negative-visualization",
          "evening-reflection"
        ],
        specialties: [
          "managing-wealth-wisely",
          "dealing-with-anger",
          "time-management",
          "preparing-for-setbacks"
        ],
        mentorType: "default",
        style: "classical",
        voice: "male"
      },
      {
        id: "epictetus-001",
        name: "Epictetus",
        title: "The Freed Philosopher",
        famousQuote: "It's not what happens to you, but how you react to it that matters.",
        qualities: [
          "direct",
          "disciplined",
          "humble",
          "systematic",
          "empowering"
        ],
        primaryVirtue: "courage",
        secondaryVirtues: ["wisdom", "justice"],
        duration: 3,
        practices: [
          "contemplation",
          "discipline-training",
          "dichotomy-exercise",
          "philosophical-study"
        ],
        specialties: [
          "mastering-control",
          "building-resilience",
          "freedom-through-discipline",
          "handling-insults"
        ],
        mentorType: "default",
        style: "classical",
        voice: "male"
      }
    ]

const Page = async () => {
  // const mentors = await getMentors({ limit: 3});
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
