import { BackgroundImage } from '@/assets/images'
import { BsCalendar3Range } from 'react-icons/bs'
import { MdEventRepeat } from 'react-icons/md'
import React from 'react'
import Link from 'next/link'

interface DLayout {
    children: React.ReactNode
}

const layout = ({ children }: DLayout) => {
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center bg-tea_green-700 fixed'>
            <BackgroundImage />

            {/* nav */}
            <div className='w-[95%] h-[90%] bg-white absolute z-50 shadow-xl rounded-xl'>
                <div className='h-20 border-b border-b-dark_green-900 flex items-center justify-between px-5 text-sm'>
                    <BsCalendar3Range size={30} className="text-dark_green" />

                    <ul className='flex items-center text-dark_green'>
                        <Link href='/dashboard' className='hover:underline mr-5'>
                            <li>Home</li>
                        </Link>
                        <Link href='/dashboard' className='hover:underline mr-5'>
                            <li>Book Appointment</li>
                        </Link>
                        <Link href='/dashboard' className='hover:underline mr-5'>
                            <li>Account</li>
                        </Link>

                        <li className='bg-tea_green-500 text-dark_green-200 border border-dark_green-500 py-2 px-5 rounded-xl flex items-center hover:shadow-md hover:cursor-pointer'> <MdEventRepeat className="mr-2" size={20} />Schedule</li>

                    </ul>
                </div>

            </div>
        </div>
    )
}

export default layout
