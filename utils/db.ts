import mongoose from "mongoose";

// track the connection status
let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("MongoDB is already connected");

        return;
    }

    const mongodbUri = process.env.MONGODB_URI;

    if (!mongodbUri) {
        console.error("MONGODB_URI environment variable is not defined");
        return;
    }

    type TConnectOptions = {
        dbName: string;
        useNewUrlParser: boolean;
        useUnifiedTopology: boolean;
    }

    const options: TConnectOptions = {
        dbName: "appointment_management_system",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        await mongoose.connect(mongodbUri, options as any)

        isConnected = true;

        console.log('MONGODB connected')
    } catch (error) {
        console.log(error)
    }
}
