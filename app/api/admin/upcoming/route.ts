import Event from "@/models/EventModel";
import User from "@/models/UserSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    await connectToDB();

    try {
        const allEvents = await Event.find();

        const bookedEvents = await Promise.all(allEvents.map(async (event) => {
            const filteredAvailableTime = await Promise.all(event.availableTime.map(async (eventTime) => {
                if (eventTime.isBooked) {
                    if (eventTime.userId) {
                        const user = await User.findById(eventTime.userId);
                        if (user) {
                            return { ...eventTime.toObject(), userName: user.name };
                        }
                    } else {
                        return eventTime.toObject();
                    }
                }
            }));

            // Filter out undefined elements from the mapped array
            const validAvailableTimes = filteredAvailableTime.filter(eventTime => eventTime !== undefined);

            const hasBookedTimes = validAvailableTimes.length > 0;

            if (hasBookedTimes) {
                return { ...event.toObject(), availableTime: validAvailableTimes };
            }
        }));

        // Filter out undefined elements from the mapped array
        const filteredBookedEvents = bookedEvents.filter(event => event !== undefined);

        console.log(filteredBookedEvents);

        return NextResponse.json({
            events: filteredBookedEvents,
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
