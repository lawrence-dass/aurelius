import { getMentor } from '@/lib/actions/mentor.actions'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import MentorCompontent from '@/components/MentorCompontent'

interface MentorSessionPageProps {
  params: Promise<{
    id: string
  }>
}

const page = async ({params}: MentorSessionPageProps) => {
  const {id} = await params
  const mentor = await getMentor(id)
  const user = await currentUser();
  if(!user) redirect('/sign-in')
  if(!mentor) redirect('/mentors')
  return (
    <main>
      <article className='flex rounded-border justify-between p-6 max-md:flex-col'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden">
              <Image src={`/icons/${mentor.practice}.svg`} alt={mentor.name} width={72} height={72} />
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  <p className='font-bold text-2xl'>
                    {mentor.name}
                  </p>
                  <div className='text-sm text-gray-500'>
                    {mentor.practice}
                  </div>
                </div>
                <p className='text-lg text-gray-500'>{mentor.focus}</p>
              </div>

          </div>
          <div className='items-start text-2xl max-md:hidden'>
            {mentor.duration}
          </div>
        </div>
        </article>
        <MentorCompontent />
    </main>
  )
}

export default page