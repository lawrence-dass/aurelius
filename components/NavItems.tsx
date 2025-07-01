'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { cn } from '@/lib/utils'

const navItems = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'Mentors',
        href: '/mentors'
    },
    {
        label: 'My Journey',
        href: '/my-journey'
    }
]

const NavItems = () => {
    const pathname = usePathname()

    return (
        <nav className="flex items-center gap-4">
            {
                navItems.map((item) => (
                    <Link href={item.href} key={item.label} className={cn(pathname === item.href && 'text-primary font-semibold')}>
                        {item.label}
                    </Link>
                ))
            }
        </nav>
    )
}

export default NavItems