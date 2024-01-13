import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";
import Event from "@/models/EventModel";
import User from "@/models/UserSchema";

export async function POST(req: Request) {
    try {
        await connectToDB();

        const { date, time, userId, userRole } = await req.json();

        // Check if the user exists in the User collection
        const userExists = await User.exists({ _id: userId });

        if (!userExists) {
            return NextResponse.json(
                {
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        // Find the event for the specified date
        const existingEvent = await Event.findOne({ availableDate: date });

        if (existingEvent) {
            // Find the specific time slot
            const selectedTime = existingEvent.availableTime.find(
                (eventTime: { time: any; }) => eventTime.time === time
            );

            if (selectedTime) {
                // Check if the time slot is already booked
                if (selectedTime.isBooked) {
                    return NextResponse.json(
                        {
                            message: "Time slot is already booked",
                        },
                        { status: 400 }
                    );
                } else {
                    // Update the time slot with booking details
                    selectedTime.userId = userId;
                    selectedTime.userRole = userRole;
                    selectedTime.isBooked = true;

                    await existingEvent.save();

                    return NextResponse.json(
                        {
                            message: "Event successfully booked",
                        },
                        { status: 200 }
                    );
                }
            } else {
                return NextResponse.json(
                    {
                        message: "Invalid time slot",
                    },
                    { status: 400 }
                );
            }
        } else {
            return NextResponse.json(
                {
                    message: "Event not found for the specified date",
                },
                { status: 404 }
            );
        }
    } catch (err) {
        console.error("Error booking event:", err);
        return NextResponse.json(
            {
                message: "Failed to book event",
            },
            { status: 500 }
        );
    }
}
