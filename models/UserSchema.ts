import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
    email: string;
    name: string;
    picture: string;
    password: string;
    role: "admin" | "user";
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email field cannot be empty']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    picture: {
        type: String,
        default: ""
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "user"
    }
}, { timestamps: true })

const User = models.User || model('User', UserSchema);

export default User;


