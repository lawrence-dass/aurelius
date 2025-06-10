import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import logo from '@/public/images/logo.png'
import NavItems from './NavItems'

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
            <p> Sign In </p>
        </div>
    </nav>
  )
}

export default Navbar