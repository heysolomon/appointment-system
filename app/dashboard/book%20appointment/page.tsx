import { DatePicker } from '@/components/ui/datepicker'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const BookAppointment = () => {
  return (
    <div className='p-5'>
      <form action="" className='w-[50%] p-5'>
        {/* title */}
        <div>
          <h1 className="text-dark_green-500 font-semibold text-xl">Book appointment with VC</h1>
          <p className='text-xs text-dark_green-600'>Please enter booking info</p>
        </div>

        <div className="mb-3 mt-5 flex flex-col">
          <label htmlFor="description" className="text-sm font-semibold">Select Date</label>
          <DatePicker />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="text-sm font-semibold">Booking Description</label>
          <Textarea name='description' id='description' className='border border-dark_green-900 text-sm focus:ring-1 focus:ring-dark_green-700 mt-1' />
        </div>

        <button type='submit' className='w-full py-2 text-sm bg-tea_green-100 text-white rounded-md'>Book</button>

      </form>
    </div>
  )
}

export default BookAppointment
