import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
    availableDate: string;
    availableTime: Array<{
        time: string;
        userId?: string;
        userRole?: string;
        isBooked?: boolean;
        isConfirmed?: boolean;
        isCanceled?: boolean;
    }>;
}

const EventSchema = new Schema<IEvent>({
    availableDate: {
        type: String,
        unique: true,
        required: [true, 'date is required']
    },
    availableTime: {
        type: [{
            time: {
                type: String,
                required: [true, "Time is required"]
            },
            userId: String,
            userRole: String,
            isBooked: {
                type: Boolean,
                default: false
            },
            isConfirmed: {
                type: Boolean,
                default: false
            },
            isCanceled: {
                type: Boolean,
                default: false
            },
        }],
        required: [true, 'time required is required']
    }
}, { timestamps: true });

const Event = models.Event || model<IEvent>('Event', EventSchema);

export default Event;
