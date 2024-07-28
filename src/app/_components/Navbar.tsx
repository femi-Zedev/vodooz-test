"use client"
import { CartIcon } from '@/components/icon'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const navLinks = [
  { label: 'Acceuil', link: '/' },
  { label: 'Les livres', link: '/etageres' }
]

export default function Navbar() {

  const pathName = usePathname()
  const pathPart = pathName.split('/')

  return (
    <nav className={`${pathName == '/' ? 'absolute': 'bg-[#FF971D] fixed top-0 left-0 z-50'} flex items-center justify-between py-5 w-full px-32`}>
      <Link href='/' className="flex gap-6 items-center h-full">
        <h1 className={`${pathName == '/' ? 'text-black': 'text-white'}  text-3xl text-black`} ><strong className="font-medium">BOOK</strong>ISH</h1>
        <CartIcon stroke={`${pathName == '/' ? '#000000': '#FFFFFF'}`} />
      </Link>

      <hgroup className="flex gap-10 items-center">
        {navLinks.map((nav, i) => (
          <Link key={i} className="flex flex-col items-center gap-2" href={nav.link}>
            <p className={`body16-semi text-white`}>{nav.label} </p>
            <hr className={`w-5 h-[3px] ${'/'+pathPart[1] == nav.link  ? 'bg-white' : 'invisible'} `} />
          </Link>
        ))}
      </hgroup>
    </nav>
  )
}
