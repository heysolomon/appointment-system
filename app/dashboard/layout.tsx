"use client"

import { BackgroundImage } from '@/public/assets/images/images'
import { CiMenuFries } from "react-icons/ci";
import React from 'react'
import Link from 'next/link'
import { NsukLogo } from '@/public/assets/icons/icons'
import { usePathname } from 'next/navigation'
import Protected from '@/private/protected'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DLayout {
    children: React.ReactNode
}

const Layout = ({ children }: DLayout) => {
    const pathname = usePathname()
    return (
        <Protected>
            <div className='w-screen h-screen flex flex-col items-center justify-center bg-tea_green-700 md:fixed'>
                <BackgroundImage />
                {/* nav */}
                <div className='w-[95%] h-[95%] md:h-[90%] bg-white absolute z-50 shadow-xl rounded-xl'>
                    <div className='h-20 border-b border-b-dark_green-900 flex items-center justify-between px-5 text-sm'>
                        <NsukLogo />

                        <ul className='hidden md:flex items-center text-dark_green'>
                            <Link href='/dashboard' className={`hover:underline mr-5 ${pathname === "/dashboard" && "underline"}`}>
                                <li>Home</li>
                            </Link>
                            <Link href='/dashboard/book appointment' className={`hover:underline mr-5 ${pathname === "/dashboard/book%20appointment" && "underline"}`}>
                                <li>Book Appointment</li>
                            </Link>

                            <Link href='/login' className={`hover:underline mr-5`}>
                                <li className='bg-tea_green-500 text-dark_green-200 border border-dark_green-500 py-2 px-5 rounded-xl flex items-center hover:shadow-md hover:cursor-pointer'>Logout</li>
                            </Link>

                        </ul>
                        <Popover>
                            <PopoverTrigger className="md:hidden">
                                <CiMenuFries size={25} />
                            </PopoverTrigger>
                            <PopoverContent>
                                <ul className='text-dark_green text-sm'>
                                    <Link href='/dashboard' className={`hover:underline mr-5 ${pathname === "/dashboard" && "underline"}`}>
                                        <li>Home</li>
                                    </Link>
                                    <Link href='/dashboard/book appointment' className={`hover:underline mr-5 ${pathname === "/dashboard/book%20appointment" && "underline"}`}>
                                        <li>Book Appointment</li>
                                    </Link>

                                    <Link href='/login' className={`hover:underline mr-5`}>
                                        <li className='bg-tea_green-500 text-dark_green-200 border border-dark_green-500 py-2 px-5 rounded-xl flex items-center hover:shadow-md hover:cursor-pointer'>Logout</li>
                                    </Link>
                                </ul>
                            </PopoverContent>
                        </Popover>
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
