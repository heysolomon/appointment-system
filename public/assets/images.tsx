import image from '@/public/images/background.png'
import Image from 'next/image'

import React from 'react'

export const BackgroundImage = () => {
  return (
    <Image src={image} alt='background' className='object-cover w-max h-max absolute z-10 right-0 top-0 bottom-0 left-0 opacity-5' />
  )
}
