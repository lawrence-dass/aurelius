import React from 'react'
import { cn } from '@/lib/utils'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,

} from '@/components/ui/table'
import Link from 'next/link'
import Image from 'next/image'

interface Mentor {
    id: string
    practice: string
    mentor: string
    topic: string
    duration: number
    color: string
}

import { getPracticeColor } from '@/lib/utils'

interface MentorListProps {
    title: string
    mentors: Mentor[]
    classNames?: string
}

const MentorList = ({ title, mentors, classNames }: MentorListProps) => {
  return (
    <article className={cn('mentor-list', classNames)}>
        <h2 className='font-bold text-3xl'> Recent Mentoring Sessions </h2>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='text-lg w-2/3'> Mentor </TableHead>
                    <TableHead className='text-lg'> Topic </TableHead>
                    <TableHead className='text-lg'> Practice </TableHead>
                    <TableHead className='text-lg'> Duration </TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    mentors.map((mentor) => (
                        <TableRow key={mentor.id}>
                            <TableCell className='text-lg w-2/3'>
                                <Link href={`/mentor/${mentor.id}`}>
                                    <div className='size-[72px] flex items-center justify-center rounded-lg max-md:hidden style={{ backgroundColor:  getBackgroundColor(mentor.practice)}}'>
                                        <Image src={mentor.avatar} alt={mentor.name} width={40} height={40} />
                                        <p className='text-lg font-bold'> {mentor.name} </p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <p className="font-bold text-2xl"> {mentor.mentor} </p>
                                        <p className="text-lg ">{mentor.topic}
                                        </p>
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="subject-badge w-fit" style={{ backgroundColor: getPracticeColor(mentor.practice) }}>
                                    {mentor.practice}
                                </div>
                            </TableCell>
                            <TableCell className='text-lg'> {mentor.practice} </TableCell>
                            <TableCell className='text-lg'> {mentor.duration} </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </article>
  )
}

export default MentorList