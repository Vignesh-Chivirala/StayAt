import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./db/db.js";
import { clerkMiddleware } from "@clerk/express";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import connectCloudinary from "./db/cloudinary.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";


connectCloudinary();

const app = express();
app.use(cors());


app.post("/api/stripe",express.raw({ type: "application/json" }),stripeWebhooks);


app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => res.send("API is working"));
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error: ",error);
        throw error
    })

})
.catch((err)=>{
    console.log("MongoDB connection failed: ",err)
})

export default app;

