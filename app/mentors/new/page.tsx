import React from 'react'

import MentorForm from '@/components/MentorForm'
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const NewMentor = async () => { 
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

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