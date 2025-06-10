import React from 'react'
import Image from 'next/image'

import bookmark from '@/public/icons/bookmark.svg'
import clock from '@/public/icons/clock.svg'
import Link from 'next/link'

import { Mentor } from '@/types'

const MentorCard = ({ id, name, focus, practice, duration, color }: Mentor) => {
  return (
    <article className="mentor-card" style={{ backgroundColor: color }}>
        <div className='flex justify-between items-center'>
            <div className="practice-badge">
                {practice}
            </div>
            <button className='mentor-bookmark'>
                <Image src={bookmark} alt='bookmark' width={14} height={14} />
            </button>
        </div>
        <h2 className='text-2xl font-bold'>{name}</h2>
        <p className='text-md text-gray-500'>{focus}</p>
        <div className='flex items-center gap-2'>
            <Image src={clock} alt='clock' width={20} height={20} />
            <p className='text-md text-gray-500'>{duration} minutes </p>
        </div>
        <Link href={`/mentor/${id}`} className='w-full'>
        <button className='btn-primary w-full justify-center'>
            Launch Session
        </button>
        </Link>
        </article>
  )
}

export default MentorCard