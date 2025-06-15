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

const currentMentor = {
  id: "marcus-aurelius-001",
  name: "Marcus Aurelius",
  title: "The Philosopher Emperor",
  famousQuote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
  introduction: "I am Marcus Aurelius, Roman Emperor from 161 to 180 AD. Born into privilege, I found my true wealth in philosophy. While leading the empire through war and plague, I wrote my 'Meditations' - private reflections never meant for publication. I believe in seeing obstacles as opportunities, maintaining perspective through cosmic awareness, and fulfilling one's duty without complaint. My strength lies in blending power with humility, action with reflection. Let me guide you through the art of maintaining inner peace while managing life's responsibilities.",
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
}

const page = async ({ params }: MentorSessionPageProps) => {
  console.log('params', params)
  // const {id} = await params  
  // const mentor = await getMentor(id)
  const mentor = currentMentor
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