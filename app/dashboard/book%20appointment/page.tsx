
import { CalendarComponent } from '@/components/Calender'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/textarea'
import { AnimatedImage } from '@/public/assets/images/images'
import React from 'react'

const BookAppointment = () => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='border-r border-r-slate-400 h-full py-5 px-10'>
        <h1 className="text-dark_green-500 font-semibold text-xl">Book appointment with VC</h1>
        <p className='text-sm text-dark_green-600'>Please enter booking info</p>
        <div className='w-[80%] max-w-[500px]'>
          <AnimatedImage />
        </div>
      </div>

      <div className='p-5'>
        <div className='grid grid-cols-2 gap-5 mt-5'>
          <div>
            <label htmlFor="description" className="text-sm font-semibold">Select Date</label>
            <CalendarComponent />
          </div>
          <div className="mb-3">
            <div className="mb-3">
              <label htmlFor="user" className="text-sm font-semibold">Time</label>
              <Select>
                <SelectTrigger className="w-full ring-dark_green-700" id='user'>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  <SelectItem value="morning" className='hover:bg-dark_green-900 hover:cursor-pointer'>8:00 am</SelectItem>
                  <SelectItem value="afternoon" className='hover:bg-dark_green-900 hover:cursor-pointer'>12:00 pm</SelectItem>
                  <SelectItem value="evening" className='hover:bg-dark_green-900 hover:cursor-pointer'>4:00 pm</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <label htmlFor="description" className="text-sm font-semibold">Booking Description</label>
            <Textarea name='description' id='description' className='border border-dark_green-900 text-sm focus:ring-1 focus:ring-dark_green-700 mt-1' />

            <div className="mt-5">
              <button type='submit' className='w-full px-10 py-2 text-sm bg-tea_green-100 text-white rounded-md'>Book a meeting</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookAppointment
