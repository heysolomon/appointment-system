import User from "@/models/UserSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        await connectToDB()

        const { email, name, userType, password } = await req.json()

        const userExists = await User.findOne({ email });

        if (userExists) {
            return NextResponse.json({
                message: "User already exists"
            }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = {
            email,
            name,
            role: userType,
            password: hashedPassword,
        }

        await User.create(user)

        return NextResponse.json({
            message: "User registered"
        }, { status: 201 })
    } catch (err) {
        NextResponse.json({
            message: "Failed to register user"
        }, { status: 500 })
        throw new Error("Failed to register user")
    }
}
