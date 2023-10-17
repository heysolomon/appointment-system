import { BackgroundImage } from '@/assets/images'
import React from 'react'

interface DLayout {
    children: React.ReactNode
}

const layout = ({ children }: DLayout) => {
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center bg-tea_green-700 fixed'>
            <BackgroundImage />
            <div className='w-[95%] h-[90%] bg-white absolute z-50 shadow-lg rounded-xl'>

            </div>
        </div>
    )
}

export default layout
