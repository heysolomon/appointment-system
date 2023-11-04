import Spinner from '@/components/spinner'
import React from 'react'

const loading = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center bg-dark_green-900'>
            <Spinner className='w-10 h-10' />
        </div>
    )
}

export default loading
