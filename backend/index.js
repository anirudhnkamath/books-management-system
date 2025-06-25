import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import booksRoute from "./routes/bookRoute.js"
import usersRoute from "./routes/userRoute.js";

const app = express();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Server successfully connected to MongoDB");

        const PORT = process.env.PORT ? process.env.PORT : 3001;
        app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`);
        });     
    })
    .catch((err) => {
        console.log(err.message);
    });

app.use(express.json());
app.use(cors());

app.use("/books", booksRoute);
app.use("/users", usersRoute);

