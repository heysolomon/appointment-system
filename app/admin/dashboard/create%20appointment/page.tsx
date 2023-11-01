
import { CalendarComponent } from '@/components/Calender'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { AnimatedImage } from '@/public/assets/images/images'
import React from 'react'

const BookAppointment = () => {
  type TTime = {
    time: string;
  }

  const times: TTime[] = [
    {
      time: "8:00am"
    },
    {
      time: "9:00am"
    },
    {
      time: "10:00am"
    },
    {
      time: "11:00am"
    },
    {
      time: "12:00pm"
    },
    {
      time: "1:00pm"
    },
    {
      time: "2:00pm"
    },
    {
      time: "3:00pm"
    },
    {
      time: "4:00pm"
    },
  ]
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='border-r border-r-dark_green-600 max-h-[97%] py-5 px-10'>
        <h1 className="text-dark_green-500 font-semibold text-xl">Create an appointment schedule</h1>
        <p className='text-sm text-dark_green-600'>Please enter schedule details</p>
        <div className='w-[80%] max-w-[500px]'>
          <AnimatedImage />
        </div>
      </div>

      <div className='p-5'>
        <div className='grid grid-cols-2 gap-5 mt-5'>
          <div>
            <label htmlFor="description" className="text-sm font-semibold">Select Available Dates</label>
            <CalendarComponent />
          </div>
          <div className="mb-3">
            <div className="mb-3">
              <label htmlFor="user" className="text-sm font-semibold">Select available times</label>
              <Select>
                <SelectTrigger className="w-full ring-dark_green-700" id='user'>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  {times.map((item, i) => (
                    <SelectItem
                      key={i}
                      value={item.time}
                      className='hover:bg-dark_green-900 hover:cursor-pointer'>
                      {item.time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-5">
              <button type='submit' className='w-full px-10 py-2 text-sm bg-tea_green-100 text-white rounded-md'>Create a booking</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookAppointment
