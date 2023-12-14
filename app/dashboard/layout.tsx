"use client"

import { BackgroundImage } from '@/public/assets/images/images'
import { MdEventRepeat } from 'react-icons/md'
import { CiMenuFries } from "react-icons/ci";
import React from 'react'
import Link from 'next/link'
import { NsukLogo } from '@/public/assets/icons/icons'
import { usePathname } from 'next/navigation'
import Protected from '@/private/protected'

interface DLayout {
    children: React.ReactNode
}

const Layout = ({ children }: DLayout) => {
    const pathname = usePathname()
    return (
        <Protected>
            <div className='w-screen h-screen flex flex-col items-center justify-center bg-tea_green-700 fixed'>
                <BackgroundImage />
                {/* nav */}
                <div className='w-[95%] h-[90%] bg-white absolute z-50 shadow-xl rounded-xl'>
                    <div className='h-20 border-b border-b-dark_green-900 flex items-center justify-between px-5 text-sm'>
                        <NsukLogo />

                        <ul className='hidden md:flex items-center text-dark_green'>
                            <Link href='/dashboard' className={`hover:underline mr-5 ${pathname === "/dashboard" && "underline"}`}>
                                <li>Home</li>
                            </Link>
                            <Link href='/dashboard/book appointment' className={`hover:underline mr-5 ${pathname === "/dashboard/book%20appointment" && "underline"}`}>
                                <li>Book Appointment</li>
                            </Link>
                            <li className='bg-tea_green-500 text-dark_green-200 border border-dark_green-500 py-2 px-5 rounded-xl flex items-center hover:shadow-md hover:cursor-pointer'>Logout</li>

                        </ul>
                        <button type="button">
                            <CiMenuFries size={20} />
                        </button>
                    </div>

                    <div className='w-full h-full'>
                        {children}
                    </div>

                </div>
            </div>
        </Protected>
    )
}

export default Layout
