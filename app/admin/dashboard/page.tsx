'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReduxState } from '@/lib/redux'
import { getEventsFailure, getEventsStart, getEventsSuccess, getUpcomingEventsFailure, getUpcomingEventsStart, getUpcomingEventsSuccess } from '@/lib/redux/features/admin/eventSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard = () => {
    const { adminData } = useSelector((state: ReduxState) => state.admin);
    const { events, upcomingEvent } = useSelector((state: ReduxState) => state.events);

    const dispatch = useDispatch();

    const upcominAppointments = () => {
        const bookedEvents = events.filter((event) =>
            event.availableTime.some((eventTime) => eventTime.isBooked)
        );

        if (bookedEvents.length > 0) {
            dispatch(getUpcomingEventsSuccess(bookedEvents))
        }
    }

    useEffect(() => {
        const getAllEvents = async (): Promise<void> => {
            dispatch(getEventsStart())
            try {
                const res = await fetch('/api/admin/appointment', {
                    method: 'GET',
                })

                const data = await res.json();

                dispatch(getEventsSuccess(data.events))
            } catch (err) {
                dispatch(getEventsFailure())
                console.log(err)
            }
        }

        getAllEvents()
    }, [])

    useEffect(() => {
        const getUpcomingEvents = async (): Promise<void> => {
            dispatch(getUpcomingEventsStart())
            try {
                const res = await fetch('/api/admin/upcoming', {
                    method: 'GET',
                })

                const data = await res.json();

                dispatch(getUpcomingEventsSuccess(data.events))
            } catch (err) {
                dispatch(getUpcomingEventsFailure())
                console.log(err)
            }
        }

        getUpcomingEvents()
    }, [])
    return (
        <div className='p-5 md:p-10 h-max'>
            <div>
                <h1 className="text-dark_green-500 font-semibold text-lg">Welcome Back {adminData?.name}</h1>
                <p className='text-[10px] md:text-xs text-dark_green-600'>Efficiently manage your schedule with visitors on our secure dashboard.</p>
            </div>
            <Tabs defaultValue="upcoming" className="w-full h-max mt-5">
                <TabsList className='grid grid-cols-2 h-min lg:inline-flex'>
                    <TabsTrigger value="create_event" className="px-5 text-[10px] md:text-sm">Created Events</TabsTrigger>
                    <TabsTrigger value="upcoming" className="px-5 text-[10px] md:text-sm">Upcoming Appointments</TabsTrigger>
                </TabsList>
                <TabsContent value="create_event" className=''>
                    <div className='p-5'>
                        {
                            events.length === 0 ? <h1 className="text-dark_green-500 font-semibold text-xl mb-5">No Events currently</h1> : <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">Date</TableHead>
                                        <TableHead>Available Times</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {events.map((event) => {
                                        const dateObject = new Date(event.availableDate);
                                        console.log(dateObject)
                                        return (
                                            <TableRow key={event._id}>
                                                <TableCell className="font-medium">{dateObject.toDateString()}</TableCell>
                                                <TableCell>
                                                    {event.availableTime.map((time) => {
                                                        const dateObjectTime = new Date(time.time)
                                                        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
                                                        const formattedTime = dateObjectTime.toLocaleTimeString('en-US', timeOptions);
                                                        return (
                                                            formattedTime + ", "
                                                        )
                                                    })}
                                                </TableCell>
                                            </TableRow>

                                        )
                                    })}
                                </TableBody>
                            </Table>
                        }
                    </div>
                </TabsContent>
                <TabsContent value="upcoming" className=''>
                    {
                        upcomingEvent.length === 0 ? <h1 className="text-dark_green-500 font-semibold text-xl mb-5">No Events currently</h1> : <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Booked Date</TableHead>
                                    <TableHead>Booking Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {upcomingEvent.map((event) => {
                                    const dateObject = new Date(event.availableDate);
                                    return (
                                        <TableRow key={event._id}>
                                            <TableCell className="font-medium">{dateObject.toDateString()}</TableCell>
                                            {event.availableTime.map((time) => {
                                                const dateObjectTime = new Date(time.time)
                                                const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
                                                const formattedTime = dateObjectTime.toLocaleTimeString('en-US', timeOptions);

                                                return (
                                                    <TableCell key={event._id} className='text-xs'>
                                                        <div key={time._id} className='w-[20%] pb-3 mb-3 border-b border-b-slate-300 pr-3'>
                                                            <p className='capitalize'>Name: {time.userName}</p>
                                                            <p>Time: {formattedTime}</p>
                                                            <p className='capitalize'>User: {time.userRole}</p>
                                                        </div>
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>

                                    )
                                })}
                            </TableBody>
                        </Table>
                    }
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Dashboard
