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

import { Mentor } from '@/types'
import Image from 'next/image'
import clock from '@/public/icons/clock.svg'


interface MentorListProps {
    mentors: Mentor[]
    classNames?: string
}

const MentorList = ({ mentors, classNames }: MentorListProps) => {
    
  return (
    <article className={cn('mentor-list', classNames)}>
        <h2 className='font-bold text-3xl'> Recent Mentoring Sessions </h2>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='text-xl font-bold'> Mentor </TableHead>
                    <TableHead className='text-xl font-bold'> Focus </TableHead>
                    <TableHead className='text-xl font-bold'> Practice </TableHead>
                    <TableHead className='text-xl font-bold'> Duration </TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                { mentors && mentors.length > 0 &&
                    mentors.map((mentor) => (
                        <TableRow key={mentor?.id}>
                            <TableCell className='text-lg'>
                                <Link href={`/mentors/${mentor?.id}`}>
                                        <p className='text-lg font-bold'> {mentor?.name} </p>
                                    <div className='flex flex-col gap-2'>
                                        <p className="font-bold text-2xl"> {mentor?.mentor} </p>
                                        <p className="text-lg ">{mentor?.focus}
                                        </p>
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="text-gray-700 practice-badge w-fit">
                                    {mentor?.practice}
                                </div>
                            </TableCell>
                            <TableCell className='text-lg'> {mentor?.practice} </TableCell>
                            <TableCell>
                
                                <div className='flex items-center gap-1' >
                                    <p className='text-lg'>{mentor?.duration}</p>
                                <Image src={clock} alt='clock' width={20} height={20} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </article>
  )
}

export default MentorList