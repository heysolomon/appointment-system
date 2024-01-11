import User from "@/models/UserSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        await connectToDB()

        const { date, time } = await req.json()

        const userExists = await User.findOne({ email });

        if (!userExists) {
            return NextResponse.json({
                message: "Invalid credentials"
            }, { status: 400 });
        }

        if (userExists.role === "user") {
            return NextResponse.json({
                message: "Invalid credentials"
            }, { status: 400 });
        }

        const passwordMatch = await bcrypt.compare(password, userExists.password);

        if (!passwordMatch) {
            return NextResponse.json({
                message: "Invalid credentials"
            }, { status: 400 });
        }

        return NextResponse.json({
            message: "User registered",
            user: {
                email: userExists.email,
                name: userExists.name,
            }
        }, { status: 200 })
    } catch (err) {
        NextResponse.json({
            message: "Invalid credentials"
        }, { status: 500 })
        throw new Error("Invalid credentials")
    }
}
