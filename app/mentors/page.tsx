'use client'

import React from 'react'
import { getMentors } from '@/lib/actions/mentor.actions'
import { SearchParams } from 'next/dist/server/request/search-params'
import MentorList from '@/components/MentorList';

const page = async ({ searchParams }: SearchParams ) => {
  const filters = await searchParams;
  const practice = typeof filters === "string" ? filters : Array.isArray(filters) ? filters[0] : undefined;
  const focus = typeof filters === "string" ? filters : Array.isArray(filters) ? filters[1] : undefined;
  const mentors = await getMentors({ practice, focus });
  return (
    <div>
      <h1>Mentors</h1> 
      <p>Practice: {practice}</p>
      <p>Focus: {focus}</p>
      <MentorList mentors={mentors} />
    </div>
  )
}

export default page