import React from 'react'

import MentorForm from '@/components/MentorForm'

const NewMentor = () => {
  return (
    <main className='min-lg:w-1/3 min-md:w-2/3 items-center justify-center'>
      <article>
        <h1>Create a New Mentor</h1>
        <MentorForm />
      </article>
    </main>
  )
}

export default NewMentor