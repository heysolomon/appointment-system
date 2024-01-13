import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";
import Event from "@/models/EventModel";

export async function POST(req: Request) {

    try {

        await connectToDB();
        
        const { date, time } = await req.json();

        console.log(req.json()); // This line might be unnecessary

        const existingEvent = await Event.findOne({ availableDate: date });

        if (existingEvent) {
            // Use array.includes() to check if the time already exists in availableTime
            if (existingEvent.availableTime.includes(time)) {
                return NextResponse.json(
                    {
                        message: "Time already created",
                    },
                    { status: 400 }
                );
            } else {
                // If the time doesn't exist, push it to the array and save
                existingEvent.availableTime.push(time);
                await existingEvent.save();
                return NextResponse.json(
                    {
                        message: "Event successfully created",
                    },
                    { status: 201 }
                );
            }
        } else {
            // If the date doesn't exist, create a new event
            const newEvent = new Event({
                availableDate: date,
                availableTime: [time],
            });

            await Event.create(newEvent);
            return NextResponse.json(
                {
                    message: "Event successfully created",
                },
                { status: 201 }
            );
        }
    } catch (err) {
        console.error("Error creating event:", err);
        return NextResponse.json(
            {
                message: "Failed to create event",
            },
            { status: 500 }
        );
    }
}
