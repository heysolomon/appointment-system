import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";
import Event, { IEvent } from "@/models/EventModel";

// Function to fetch lower-priority users based on userRole
const getLowerPriorityUsers = async (userRole: string): Promise<Array<IEvent["availableTime"][0]>> => {
    // Implement your logic to fetch lower-priority users
    // For example, you might fetch all users with a lower priority than the given userRole

    const priorities: {
        official: number;
        staff: number;
        visitor: number;
        student: number;
    } = {
        official: 4,
        staff: 3,
        visitor: 2,
        student: 1,
    };

    const lowerPriorityUsers = await Event.find({
        "availableTime.userRole": { $lt: userRole },
        "availableTime.isBooked": true,
    });

    // Flatten the availableTime arrays from lowerPriorityUsers
    const lowerPriorityUsersArray = lowerPriorityUsers.reduce<Array<IEvent["availableTime"][0]>>(
        (acc, event) => acc.concat(event.availableTime),
        []
    );

    // Filter out users with the same or higher priority
    const filteredLowerPriorityUsers = lowerPriorityUsersArray.filter(
        (user) => priorities[user.userRole] < priorities[userRole]
    );

    return filteredLowerPriorityUsers;
};

// Function to find the next available time for a user
const findNextAvailableTime = (existingEvent: IEvent, userRole: string): string | undefined => {
    // Implement your logic to find the next available time for the user
    // This is just a placeholder, you need to customize it based on your requirements
    return "2024-01-15T14:00:00";
};

export async function POST(req: Request) {
    try {
        await connectToDB();
        const { date, time, userRole, userId } = await req.json();

        const existingEvent = await Event.findOne({ availableDate: date });

        if (existingEvent) {
            // Use array.some() to check if the time already exists in availableTime
            if (existingEvent.availableTime.some((eventTime: { time: any; }) => eventTime.time === time)) {
                // Check if the user already booked the same time
                const userAlreadyBooked = existingEvent.availableTime.some(
                    (eventTime: { time: any; userId: any; }) => eventTime.time === time && eventTime.userId === userId
                );

                if (userAlreadyBooked) {
                    return NextResponse.json(
                        {
                            message: "You already booked this time",
                        },
                        { status: 400 }
                    );
                }

                // Get lower-priority users based on userRole
                const lowerPriorityUsers = await getLowerPriorityUsers(userRole);

                // Try to reschedule lower-priority users
                for (const lowerPriorityUser of lowerPriorityUsers) {
                    // Find the next available time for the lower-priority user
                    const nextAvailableTime = findNextAvailableTime(existingEvent, lowerPriorityUser.userRole);

                    if (nextAvailableTime) {
                        // Update the lower-priority user's appointment to the next available time
                        lowerPriorityUser.time = nextAvailableTime;
                        lowerPriorityUser.isBooked = true;

                        // Save the changes to the existingEvent
                        await existingEvent.save();

                        return NextResponse.json(
                            {
                                message: "Appointment successfully booked",
                            },
                            { status: 201 }
                        );
                    }
                }

                return NextResponse.json(
                    {
                        message: "Time already booked, and no available slots for lower-priority users",
                    },
                    { status: 400 }
                );
            } else {
                // If the time doesn't exist, create a new eventTime
                existingEvent.availableTime.push({
                    time,
                    userId,
                    userRole,
                    isBooked: true,
                    isConfirmed: false,
                    isCanceled: false,
                });

                // Save the changes to the existingEvent
                await existingEvent.save();

                return NextResponse.json(
                    {
                        message: "Appointment successfully booked",
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
                        userId,
                        userRole,
                        isBooked: true,
                        isConfirmed: false,
                        isCanceled: false,
                    },
                ],
            });

            await Event.create(newEvent);

            return NextResponse.json(
                {
                    message: "Appointment successfully booked",
                },
                { status: 201 }
            );
        }
    } catch (err) {
        console.error("Error booking appointment:", err);
        return NextResponse.json(
            {
                message: "Failed to book appointment",
            },
            { status: 500 }
        );
    }
}
