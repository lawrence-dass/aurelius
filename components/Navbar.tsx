import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import logo from '@/public/images/logo.png'
import NavItems from './NavItems'
import { SignedOut, UserButton } from '@clerk/nextjs'
import { SignedIn } from '@clerk/nextjs'
import { SignInButton } from '@clerk/nextjs'

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer">
                    <Image src={logo} alt="logo" width={60} height={60} />
                </div>
            </Link>
            <div className="flex items-center gap-8">
                <NavItems />
                <SignedOut>
                    <SignInButton>
                        <button className='btn-signin'>
                            Sign In
                        </button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}

export default Navbar