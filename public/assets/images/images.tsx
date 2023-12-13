import image from './background.png'
import animate from './image.svg'
import Image from 'next/image'
import authImage from "./Calendar-bro.svg"
import noData from "./no-data.svg"

import React from 'react'

type TProps = {
  className: string;
}

export const BackgroundImage = () => {
  return (
    <Image src={image} alt='background' className='object-cover w-max h-max absolute z-10 right-0 top-0 bottom-0 left-0 opacity-5' />
  )
}

export const AuthImage = (props: TProps) => {
  return (
    <Image src={authImage} alt='illustration' {...props} />
  )
}

export const AnimatedImage = () => {
  return (
    <Image src={animate} alt='animated picture' className='w-full' />
  )
}

export const NoDataImage = (props: TProps) => {
  return (
    <Image src={noData} alt='no data' {...props} />
  )
}


