import UpcomingAppoinments from '@/components/admin/dashboard/upcoming_appointments/page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NoDataImage } from '@/public/assets/images/images'
import React from 'react'

const page = () => {
    return (
        <div className='p-10 h-max'>
            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList>
                    <TabsTrigger value="create_event" className="px-5 text-sm">Created Events</TabsTrigger>
                    <TabsTrigger value="upcoming" className="px-5 text-sm">Upcoming Appointments</TabsTrigger>
                    <TabsTrigger value="canceled" className="px-5 text-sm">Canceled Appointments</TabsTrigger>
                </TabsList>
                <TabsContent value="create_event" className=''>
                    <div className='p-5'>
                        <h1 className="text-dark_green-500 font-semibold text-xl mb-5">No Events currently</h1>
                        <NoDataImage className='w-[30%]' />
                    </div>
                </TabsContent>
                <TabsContent value="upcoming" className=''>
                    <UpcomingAppoinments />
                </TabsContent>
                <TabsContent value="canceled">canceled appointments goes here</TabsContent>
            </Tabs>
        </div>
    )
}

export default page
