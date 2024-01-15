import User from "@/models/UserSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        await connectToDB()

        const { email, password } = await req.json()

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
            message: "Please wait, you will be redirected to your dashboard",
            user: {
                email: userExists.email,
                name: userExists.name,
                id: userExists._id,
            }
        }, { status: 200 })
    } catch (err) {
        NextResponse.json({
            message: "Invalid credentials"
        }, { status: 500 })
        throw new Error("Invalid credentials")
    }
}
