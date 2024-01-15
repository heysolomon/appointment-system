'use client'

import UpcomingAppoinments from '@/components/dashboard/upcoming_appointments/page'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReduxState } from '@/lib/redux'
import { getEventsFailure, getEventsStart, getEventsSuccess } from '@/lib/redux/features/admin/eventSlice'
import { NoDataImage } from '@/public/assets/images/images'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard = () => {
    const { adminData } = useSelector((state: ReduxState) => state.admin);
    const { events } = useSelector((state: ReduxState) => state.events);

    const dispatch = useDispatch();

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
                    <UpcomingAppoinments />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Dashboard
