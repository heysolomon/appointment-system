import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";
import Event, { IEvent } from "@/models/EventModel";
import { sendEmail } from "@/utils/email";
import User from "@/models/UserSchema";

// Function to find the next available time for a user
const findNextAvailableTime = async (time: string, date: string, lowerPriorityUser: { _id: any; role: any; name: any; email: any; }) => {
    const existingEvent = await Event.findOne({ availableDate: date });

    const availableTimes = existingEvent.availableTime.filter((eventTime: { isBooked: boolean; }) => !eventTime.isBooked);

    availableTimes.sort((a: { time: string | number | Date; }, b: { time: string | number | Date; }) => new Date(a.time) - new Date(b.time));

    const nextAvailableTimes = availableTimes[0];

    if (nextAvailableTimes) {
        await Event.updateOne(
            {
                availableDate: nextAvailableTimes.date,
                "availableTime.isBooked": false,
            },
            {
                $set: {
                    "availableTime.$[element].userId": lowerPriorityUser._id,
                    "availableTime.$[element].userRole": lowerPriorityUser.role,
                    "availableTime.$[element].isBooked": true,
                },
            },
            {
                arrayFilters: [
                    {
                        "element.isBooked": false,
                    },
                ],
            }
        );

        // convert date to this format January 13, 2024
        const dateObject = new Date(date)
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = dateObject.toLocaleDateString('en-US', options);

        const dateObjectTime = new Date(nextAvailableTimes.time)
        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
        const formattedTime = dateObjectTime.toLocaleTimeString('en-US', timeOptions);

        const htmlMessage = `
            <html>
                <body>
                    <p>Hi ${lowerPriorityUser.name},</p>
                    <p>We hope this message finds you well. We wanted to inform you that your appointment has been rescheduled to a new time</p>
                    <ul>
                        <li>Date: ${formattedDate}</li>
                        <li>Time: ${formattedTime}</li>
                    </ul>
                    <p>Thank you for using our appointment system.</p>
                    <p>Best regards,<br/> NSUK Appointment System</p>
                </body>
            </html>
        `

        const emailOptions = {
            to: lowerPriorityUser.email,
            subject: "VC Appointment Booked",
            html: htmlMessage,
        };

        await sendEmail(emailOptions);

        NextResponse.json(
            {
                message: "Appointment successfully booked",
            },
            { status: 201 }
        );
    } else {
        // If no next available time is found, check other dates in the collection
        const otherDates = await Event.find({ availableDate: { $ne: date } });

        for (const otherDateEvent of otherDates) {
            const otherAvailableTimes = otherDateEvent.availableTime.filter((eventTime: { isBooked: boolean; }) => !eventTime.isBooked);
            otherAvailableTimes.sort((a: { time: string | number | Date; }, b: { time: string | number | Date; }) => new Date(a.time) - new Date(b.time));

            const nextOtherAvailableTime = otherAvailableTimes[0];

            if (nextOtherAvailableTime) {
                // Found an available time in another date, update and notify the user
                await Event.updateOne(
                    {
                        availableDate: otherDateEvent.availableDate,
                        "availableTime.isBooked": false,
                    },
                    {
                        $set: {
                            "availableTime.$[element].userId": lowerPriorityUser._id,
                            "availableTime.$[element].userRole": lowerPriorityUser.role,
                            "availableTime.$[element].isBooked": true,
                        },
                    },
                    {
                        arrayFilters: [
                            {
                                "element.isBooked": false,
                            },
                        ],
                    }
                );

                // Convert date to the required format
                const dateObject = new Date(otherDateEvent.availableDate);
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                const formattedDate = dateObject.toLocaleDateString('en-US', options);

                const dateObjectTime = new Date(nextOtherAvailableTime.time);
                const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
                const formattedTime = dateObjectTime.toLocaleTimeString('en-US', timeOptions);

                const htmlMessage = `
                    <html>
                        <body>
                            <p>Hi ${lowerPriorityUser.name},</p>
                            <p>We hope this message finds you well. We wanted to inform you that your appointment has been rescheduled to a new time</p>
                            <ul>
                                <li>Date: ${formattedDate}</li>
                                <li>Time: ${formattedTime}</li>
                            </ul>
                            <p>Thank you for using our appointment system.</p>
                            <p>Best regards,<br/> NSUK Appointment System</p>
                        </body>
                    </html>
                `;

                const emailOptions = {
                    to: lowerPriorityUser.email,
                    subject: "VC Appointment Booked",
                    html: htmlMessage,
                };

                await sendEmail(emailOptions);

                NextResponse.json(
                    {
                        message: "Appointment successfully booked",
                    },
                    { status: 201 }
                );

                return;
            }
        }

        // No available time found in other dates as well, notify the user
        const noAvailableTimeMessage = `
            <html>
                <body>
                    <p>Hi ${lowerPriorityUser.name},</p>
                    <p>We regret to inform you that there are currently no available time slots for your appointment. Our system is actively working to identify new available slots, and we will get back to you shortly with alternative options.</p>
                    <p>Thank you for your understanding.</p>
                    <p>Best regards,<br/> NSUK Appointment System</p>
                </body>
            </html>
        `;

        const noAvailableTimeOptions = {
            to: lowerPriorityUser.email,
            subject: "No Available Appointment Times",
            html: noAvailableTimeMessage,
        };

        await sendEmail(noAvailableTimeOptions);

        NextResponse.json(
            {
                message: "No available time slots at the moment",
            },
            { status: 400 }
        );
    }
};


const bookPriority = async (date: string, time: string, userRole: string, userId: string) => {
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

    try {
        const existingEvent = await Event.findOne({
            availableDate: date,
            "availableTime.time": time,
            "availableTime.isBooked": true,
        });

        if (!existingEvent) {
            NextResponse.json(
                {
                    message: "No existing event found for the specified date and time.",
                },
                { status: 400 }
            );
        }

        const bookedTime = existingEvent.availableTime.find(
            (eventTime: { time: string; isBooked: any; }) => eventTime.time === time
        );

        console.log("Booked time", bookedTime);
        if (!bookedTime) {
            NextResponse.json(
                {
                    message: "No booking time found",
                },
                { status: 400 }
            );
        }

        console.log("Booked Time", bookedTime)

        if (priorities[bookedTime.userRole] > priorities[userRole]) {
            NextResponse.json(
                {
                    message: "Time already booked",
                },
                { status: 400 }
            );
        }

        if (priorities[bookedTime.userRole] < priorities[userRole]) {

            await Event.updateOne(
                {
                    availableDate: date,
                    "availableTime.time": time,
                    "availableTime.isBooked": true,
                },
                {
                    $set: {
                        "availableTime.$[element].userId": userId,
                        "availableTime.$[element].userRole": userRole,
                    },
                },
                {
                    arrayFilters: [
                        {
                            "element.time": time,
                        },
                    ],
                }
            );

            const lowerPriorityUser = await User.findById(bookedTime.userId);
            const higherPriorityUser = await User.findById(userId);

            // convert date to this format January 13, 2024
            const dateObject = new Date(date)
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = dateObject.toLocaleDateString('en-US', options);

            const dateObjectTime = new Date(date)
            const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
            const formattedTime = dateObjectTime.toLocaleTimeString('en-US', timeOptions);

            if (lowerPriorityUser) {
                const htmlMessage = `
                    <html>
                        <body>
                            <p>Hi ${lowerPriorityUser.name},</p>
                            <p>We regret to inform you that your upcoming appointment scheduled for ${formattedDate} at ${formattedTime} with the VC has been canceled due to unforeseen circumstances. We apologize for any inconvenience this may cause.<br /><br />

                            Our system is currently working on identifying the next available dates, and we will get back to you shortly with alternative appointment options. <br /><br />
                            
                            If you have any urgent concerns or require immediate assistance, please feel free to contact our support team at apt.nsuk@gmail.com.<br /><br />

                            Thank you for your understanding, and we look forward to assisting you with a new appointment soon.<br /><br />

                            Best regards,<br />
                            VC Appointment System
                            </p>
                        </body>
                    </html>
                `
                const emailOptions = {
                    to: lowerPriorityUser.email,
                    subject: "VC Appointment Cancellation Notification",
                    html: htmlMessage,
                };
                await sendEmail(emailOptions);
            }

            if (higherPriorityUser) {
                const htmlMessage = `
                    <html>
                        <body>
                            <p>Hi ${higherPriorityUser.name},</p>
                            <p>Your appointment with the VC has been successfully booked for the following details:</p>
                            <ul>
                                <li>Date: ${formattedDate}</li>
                                <li>Time: ${formattedTime}</li>
                            </ul>
                            <p>Thank you for using our appointment system. We look forward to seeing you!</p>
                            <p>Best regards,<br/> NSUK Appointment System</p>
                        </body>
                    </html>
                `
                const emailOptions = {
                    to: higherPriorityUser.email,
                    subject: "VC Appointment Booked",
                    html: htmlMessage,
                };
                await sendEmail(emailOptions);
            }

            findNextAvailableTime(time, date, lowerPriorityUser)

            NextResponse.json(
                {
                    message: "Appointment successfully booked",
                },
                { status: 201 }
            );
        }
    } catch (error) {
        NextResponse.json(
            {
                message: "Booking failed:priority",
            },
            { status: 400 }
        );
    }
};

export async function POST(req: Request) {
    try {
        await connectToDB();
        const { date, time, userId } = await req.json();

        const userExists = await User.findOne({ _id: userId });

        if (!userExists) {
            return NextResponse.json(
                {
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        const userRole = userExists.role

        const existingEvent = await Event.findOne({ availableDate: date });

        console.log("Existing event", existingEvent)

        if (existingEvent) {
            // check if the time already exists in availableTime
            if (existingEvent.availableTime.some((eventTime: { time: any; }) => eventTime.time === time)) {
                // This checks if the user that's trying to book and event has booked before
                const userAlreadyBooked = existingEvent.availableTime.some(
                    (eventTime: { isBooked: boolean; userId: any; userRole: any; }) => eventTime.userId === userId && eventTime.userRole === userRole
                );
                console.log("User already booked?", userAlreadyBooked)

                if (userAlreadyBooked) {
                    return NextResponse.json(
                        {
                            message: "You already booked this time",
                        },
                        { status: 400 }
                    );
                }

                const alreadyBooked = existingEvent.availableTime.some(
                    (eventTime: { isBooked: any; }) => eventTime.isBooked
                );

                console.log("Aread?", userAlreadyBooked)

                if (!alreadyBooked) {
                    await Event.updateOne(
                        {
                            availableDate: date,
                            "availableTime.time": time,
                            "availableTime.isBooked": false,
                        },
                        {
                            $set: {
                                "availableTime.$[element].userId": userId,
                                "availableTime.$[element].userRole": userRole,
                                "availableTime.$[element].isBooked": true,
                            },
                        },
                        {
                            arrayFilters: [
                                {
                                    "element.time": time,
                                },
                            ],
                        }
                    );

                    // convert date to this format January 13, 2024
                    const dateObject = new Date(date)
                    const options = { day: 'numeric', month: 'long', year: 'numeric' };
                    const formattedDate = dateObject.toLocaleDateString('en-US', options);

                    const dateObjectTime = new Date(date)
                    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
                    const formattedTime = dateObjectTime.toLocaleTimeString('en-US', timeOptions);

                    const userDoc = await User.findById(userId);

                    // send email to user
                    if (userDoc) {
                        const emailOptions = {
                            to: userDoc.email,
                            subject: "VC Appointment Booked",
                            text: `Hi ${userDoc.name}, your appointment with the VC has been booked for ${formattedDate} at ${formattedTime}`,
                        };

                        await sendEmail(emailOptions);

                        return NextResponse.json(
                            {
                                message: "Appointment successfully booked",
                            },
                            { status: 201 }
                        );
                    }
                }

                if (alreadyBooked) {
                    const lowerPriorityUsers = await bookPriority(date, time, userRole, userId);

                    console.log(lowerPriorityUsers)
                }

            } else {
                return NextResponse.json(
                    {
                        message: "Time is unavailable",
                    },
                    { status: 400 }
                );
            }
        } else {

            return NextResponse.json(
                {
                    message: "Event not available, please contact the admin",
                },
                { status: 400 }
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
