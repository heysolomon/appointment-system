import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";
import Event from "@/models/EventModel";

export async function POST(req: Request) {
    try {
        await connectToDB();

        const { date, time } = await req.json();

        const existingEvent = await Event.findOne({ availableDate: date });

        if (existingEvent) {
            // Check if the time already exists in availableTime
            const existingTime = existingEvent.availableTime.find(
                (eventTime: { time: any; }) => eventTime.time === time
            );

            if (existingTime) {
                return NextResponse.json(
                    {
                        message: "Time already created",
                    },
                    { status: 400 }
                );
            } else {
                existingEvent.availableTime.push({
                    time,
                });

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
                availableTime: [
                    {
                        time,
                    },
                ],
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

export async function GET(req: Request) {
    await connectToDB();

    try {
        const allEvents = await Event.find();

        return NextResponse.json({
            events: allEvents,
        });
    } catch (err) {
        console.error("Error retrieving events:", err);
        return NextResponse.json(
            {
                message: "Failed to retrieve events",
            },
            { status: 500 }
        );
    }
}
