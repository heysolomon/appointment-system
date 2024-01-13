import { Document, Schema, model, models } from "mongoose";

// Assuming you want availableTime to be an array of strings representing time
export interface IEvent extends Document {
    availableDate: string;
    availableTime: string[];
    isBooked: boolean;
    isConfirmed: boolean;
    isCanceled: boolean;
}

const EventSchema = new Schema<IEvent>({
    availableDate: {
        type: String,
        unique: true,
        required: [true, 'date is required']
    },
    availableTime: {
        type: [String], // Change to [Date] if you want to store time as Date objects
        required: [true, 'time required is required']
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    isConfirmed: {
        type: Boolean,
    },
    isCanceled: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

const Event = models.Event || model('Event', EventSchema);

export default Event;
