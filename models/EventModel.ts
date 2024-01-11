import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
    availableDate: Date;
    availableTime: Date;
    isBooked: boolean;
    isConfirmed: boolean;
    isCanceled: boolean;
}

const EventSchema = new Schema<IEvent>({
    availableDate: {
        type: Date,
        required: [true, 'date is required']
    },
    availableTime: {
        type: Date,
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


