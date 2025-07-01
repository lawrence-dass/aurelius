import React from 'react'
import Image from 'next/image'

import bookmark from '@/public/icons/bookmark.svg'
import clock from '@/public/icons/clock.svg'
import Link from 'next/link'

import { Mentor } from '@/types'

const MentorCard = ({ id, name, title, famous_quote, primary_virtue, duration, practices, specialties }: Mentor) => {
    return (
        <article className="mentor-card">
            <div className='flex justify-between items-center'>
                <div className="virtue-badge">
                    {primary_virtue}
                </div>
                <button className='mentor-bookmark'>
                    <Image src={bookmark} alt='bookmark' width={14} height={14} />
                </button>
            </div>
            <h2 className='text-4xl font-bold text-center' >{name}</h2>
            <h3 className='text-lg font-bold text-center'>{title}</h3>
            <div className='flex items-center gap-2'>
                <p className='text-md italic text-gray-900 text-center'>{famous_quote}</p>
            </div>
            <p className='text-lg font-bold text-center mt-4'>Practices</p>
            <div className='flex justify-evenly items-center gap-2 flex-wrap '>
                {practices?.map((practice: string) => (
                    <span key={practice} className='text-sm text-gray-700 text-center bg-gray-200 rounded-3xl px-4 py-1 capitalize'>{practice}</span>
                ))}
            </div>
            <p className='text-lg font-bold text-center mt-4'>Specialties</p>
            <div className='flex justify-evenly items-center gap-2 flex-wrap'>
                {specialties?.map((specialty: string) => (
                    <span key={specialty} className='text-sm text-gray-700 bg-gray-200 rounded-3xl px-2 py-1 capitalize'>{specialty}</span>
                ))}
            </div>
            <div className='flex items-center gap-2 justify-center mt-8'>
                <Image src={clock} alt='clock' width={20} height={20} />
                <p className='text-lg font-bold text-gray-500 text-center'>{duration} minutes </p>
            </div>
            <Link href={`/mentors/${id}`} className='w-full'>
                <button className='btn-primary w-full justify-center'>
                    Launch Session
                </button>
            </Link>
        </article>
    )
}

export default MentorCard