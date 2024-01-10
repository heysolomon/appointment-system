import UpcomingAppoinments from '@/components/admin/dashboard/upcoming_appointments/page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NoDataImage } from '@/public/assets/images/images'
import React from 'react'

const page = () => {
    return (
        <div className='p-5 md:p-10 h-max'>
            <div>
                <h1 className="text-dark_green-500 font-semibold text-lg">Welcome Back Admin</h1>
                <p className='text-[10px] md:text-xs text-dark_green-600'>Efficiently manage your schedule with visitors on our secure dashboard.</p>
            </div>
            <Tabs defaultValue="upcoming" className="w-full h-max mt-5">
                <TabsList className='grid grid-cols-2 h-min lg:inline-flex'>
                    <TabsTrigger value="create_event" className="px-5 text-[10px] md:text-sm">Created Events</TabsTrigger>
                    <TabsTrigger value="requested" className="px-5 text-[10px] md:text-sm">Requested Appointments</TabsTrigger>
                    <TabsTrigger value="upcoming" className="px-5 text-[10px] md:text-sm">Confirmed Appointments</TabsTrigger>
                    <TabsTrigger value="canceled" className="px-5 text-[10px] md:text-sm">Canceled Appointments</TabsTrigger>
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
                <TabsContent value="canceled">canceled appointments goes here</TabsContent>
            </Tabs>
        </div>
    )
}

export default page
