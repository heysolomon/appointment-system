import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

const page = () => {
    return (
        <div className='p-10 h-full'>
            <Tabs defaultValue="account" className="w-full">
                <TabsList>
                    <TabsTrigger value="upcoming" className="px-5 text-sm">Upcoming Appointments</TabsTrigger>
                    <TabsTrigger value="canceled" className="px-5 text-sm">Canceled Appointments</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className=''>Upcoming appointments goes here</TabsContent>
                <TabsContent value="canceled">canceled appointments goes here</TabsContent>
            </Tabs>
        </div>
    )
}

export default page
