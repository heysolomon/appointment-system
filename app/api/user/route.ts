import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";
import Event from "@/models/EventModel";

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
