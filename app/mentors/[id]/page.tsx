import { getMentor } from '@/lib/actions/mentor.actions'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import MentorCompontent from '@/components/MentorCompontent'
import clock from '@/public/icons/clock.svg'

interface MentorSessionPageProps {
  params: Promise<{
    id: string
  }>
}


const page = async ({ params }: MentorSessionPageProps) => {
  console.log('params', params)
  const {id} = await params  
  const mentor = await getMentor(id)
  const user = await currentUser();
  console.log('user', user)
  if (!user) redirect('/sign-in')
  if (!mentor) redirect('/mentors')
  return (
    <main>
      <article className='rounded-border p-6'>
          <div className=''>
            <p className='font-bold text-2xl text-center'>
              {mentor.name}
            </p>
          </div>
        <p className='text-lg text-gray-500 text-center'>{mentor.introduction}</p>
          <div className='flex items-center gap-2 justify-center mt-2'>
            <Image src={clock} alt='clock' width={20} height={20} />
            <p className='text-lg font-bold text-gray-500 text-center'>{mentor.duration} minutes </p>
          </div>
      </article>
      <MentorCompontent userName={user.firstName} userImage={user.imageUrl} {...mentor} />
    </main>
  )
}

export default page