'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { Input } from './ui/input'
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils'

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState('');

  useEffect(() => {
    const delayInputTimeout = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'name',
          value: search,
        })
        router.push(newUrl, { scroll: false });
      }
      else {
        if (pathname.includes('mentors')) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ['name'],
          })
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(delayInputTimeout);
  }, [search, router, pathname, searchParams]);

  return (
    <div className='relative rounded-lg items-center flex gap-2 px-2 h-fit'>
      <Image src="/icons/search.svg" alt="search" width={14} height={14} />
      <Input
        type="text"
        className='bg-transparent outline-none text-sm  border-black'
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

export default SearchInput