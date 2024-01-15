'use client'

import Spinner from '@/components/spinner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { AnimatedImage } from '@/public/assets/images/images'
import React from 'react'
import { Schema, z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from 'react-redux'
import { ReduxState } from '@/lib/redux'
import { createEventsFailure, createEventsStart, createEventsSuccess } from '@/lib/redux/features/admin/eventSlice'
import { toast } from '@/components/ui/use-toast'
import { Calendar } from '@/components/ui/calendar'

const BookAppointment = () => {

  const { isLoading } = useSelector((state: ReduxState) => state.events);

  type TTime = {
    time: string;
    value: string;
  }

  const times: TTime[] = [
    {
      time: "8:00am",
      value: "2024-01-13T08:00:00.000Z",
    },
    {
      time: "9:00am",
      value: "2024-01-13T09:00:00.000Z",
    },
    {
      time: "10:00am",
      value: "2024-01-13T10:00:00.000Z",
    },
    {
      time: "11:00am",
      value: "2024-01-13T11:00:00.000Z",
    },
    {
      time: "12:00pm",
      value: "2024-01-13T12:00:00.000Z",
    },
    {
      time: "1:00pm",
      value: "2024-01-13T13:00:00.000Z",
    },
    {
      time: "2:00pm",
      value: "2024-01-13T14:00:00.000Z",
    },
    {
      time: "3:00pm",
      value: "2024-01-13T15:00:00.000Z",
    },
    {
      time: "4:00pm",
      value: "2024-01-13T16:00:00.000Z"
    },
  ]

  const dispatch = useDispatch()

  const createEventSchema: Schema = z.object({
    date: z.date({
      required_error: "A date is required",
    }),
    time: z.string(),
    userId: z.string(),
  }).required();

  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      date: new Date(),
      name: "",
      userId: "",
    },
  })

  const createEvent = async (values: z.infer<typeof createEventSchema>) => {
    dispatch(createEventsStart())
    try {
      const res = await fetch('/api/admin/appointment', {
        method: 'POST',
        body: JSON.stringify(values)
      })

      const data = await res.json();

      dispatch(createEventsSuccess())

      toast({
        variant: "success",
        title: "Successfull",
        description: data.message,
      })

    } catch (err) {
      console.log(err)

      dispatch(createEventsFailure())

      toast({
        variant: "destructive",
        title: "error",
        description: "Failed to create event",
      })
    }

  }

  const onSubmit = (values: z.infer<typeof createEventSchema>) => {
    createEvent(values);
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <div className='max-h-[97%] py-5 px-10 hidden md:block'>
        <h1 className="text-dark_green-500 font-semibold text-xl">Create an appointment schedule</h1>
        <p className='text-sm text-dark_green-600'>Please enter schedule details</p>
        <div className='w-[80%] max-w-[500px]'>
          <AnimatedImage />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 lg:max-h-[80%] md:overflow-y-auto lg:overflow-y-hidden pr-5'>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className='text-sm font-semibold'>Select Available Dates</FormLabel>
                  <FormControl>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      className="w-min text-dark_green-400"
                      initialFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mb-3 m">
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className='mb-3'>
                    <FormLabel className="text-sm font-semibold">Select available times</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full ring-dark_green-700">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-white'>
                        {times.map((item, i) => (
                          <SelectItem
                            key={i}
                            value={item.value}
                            className='hover:bg-dark_green-900 hover:cursor-pointer'>
                            {item.time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-5">
                <button type='submit' className='w-full px-10 py-2 text-sm bg-tea_green-100 text-white rounded-md flex items-center justify-center'>
                  {
                    isLoading ? <Spinner className='w-5 h-5' /> : "Create a booking"
                  }
                </button>
              </div>
            </div>
          </div>


        </form>
      </Form>
    </div>
  )
}

export default BookAppointment
