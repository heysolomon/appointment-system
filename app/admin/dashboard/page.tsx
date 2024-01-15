'use client'

import UpcomingAppoinments from '@/components/dashboard/upcoming_appointments/page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReduxState } from '@/lib/redux'
import { NoDataImage } from '@/public/assets/images/images'
import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const { adminData } = useSelector((state: ReduxState) => state.admin);
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
                        <h1 className="text-dark_green-500 font-semibold text-xl mb-5">No Events currently</h1>
                        <NoDataImage className='w-[20%]' />
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
