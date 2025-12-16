import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        mongoose.connection.on('connected', () => {
            console.log("✅ MongoDB connected successfully");
            isConnected = true;
        });

        mongoose.connection.on('error', (err) => {
            console.error("❌ MongoDB connection error:", err);
            isConnected = false;
        });

        mongoose.connection.on('disconnected', () => {
            console.log("ℹ️  MongoDB disconnected");
            isConnected = false;
        });

        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'e-commerce',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
        process.exit(1);
    }
};

// Function to start a session and transaction
const startSession = async () => {
    if (!isConnected) {
        await connectDB();
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    return session;
};

export { connectDB, startSession };