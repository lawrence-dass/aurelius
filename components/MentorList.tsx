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
import clock from '@/public/icons/clock.svg'




export interface MentorListProps {
    list: {
        id: string;
        created_at: string;
        mentor_name: string;
        mentor_practices: string[];
        user_call_usage: number;
    }[];
}

const MentorList = ({ list }: MentorListProps) => {

    return (
        <article className={cn('mentor-list')}>
            <h2 className='font-bold text-3xl text-center mb-4'> Recent Mentoring Sessions </h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-xl font-bold'> Mentor </TableHead>
                        <TableHead className='text-xl font-bold'> Practice </TableHead>
                        <TableHead className='text-xl font-bold text-center'> Duration </TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {list && list.length > 0 &&
                        list.map((item: MentorListProps['list'][number]) => (
                            <TableRow key={`${item?.id}-${item?.created_at}`}>
                                <TableCell className='text-lg'>
                                    <Link href={`/mentors/${item?.id}`}>
                                        <div className='flex flex-col gap-2'>
                                            <p className="font-bold text-2xl"> {item?.mentor_name} </p>
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <div className="text-gray-700 practice-badge w-fit">
                                        {item?.mentor_practices.map((practice: string) => <span key={practice} className='text-md mr-2'>{practice}</span>)}
                                    </div>
                                </TableCell>
                                <TableCell>

                                    <div className='flex items-center gap-1 justify-center' >
                                        <Image src={clock} alt='clock' width={20} height={20} />
                                        <span>{item?.user_call_usage ? (item.user_call_usage / 60).toFixed(2) : "0.00"} mins</span>

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