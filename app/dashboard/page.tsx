"use client"

import UpcomingAppoinments from '@/components/dashboard/upcoming_appointments/page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSession } from 'next-auth/react'
import React from 'react'

const Page = () => {
    const { data: session } = useSession()

    return (
        <div className='p-5 md:p-10 h-full'>
            <div>
                <h1 className="text-dark_green-500 font-semibold text-lg">Welcome Back {session?.user?.name}</h1>
                <p className='text-[10px] md:text-xs text-dark_green-600'>Efficiently manage your schedule with the VC on our secure dashboard.</p>
            </div>
            <Tabs defaultValue="upcoming" className="w-full mt-5">
                <TabsList className='flex justify-center'>
                    <TabsTrigger value="upcoming" className="px-5 text-[10px] md:text-sm">Upcoming Appointments</TabsTrigger>
                    <TabsTrigger value="canceled" className="px-5 text-[10px] md:text-sm">Canceled Appointments</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className=''>
                    <UpcomingAppoinments />
                </TabsContent>
                <TabsContent value="canceled">canceled appointments goes here</TabsContent>
            </Tabs>
        </div>
    )
}

export default Page
