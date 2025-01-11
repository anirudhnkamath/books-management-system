import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import booksRoute from "./routes/bookRoute.js"
import usersRoute from "./routes/userRoute.js";
import cors from "cors";
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT? process.env.PORT : 3001, () => {
            console.log(`Server running at port 3001`);
        });
    })
    .catch((err) => {
        console.log(err.message);
    });

app.use(express.json());

// app.use(cors({
//     origin: "http://localhost:3001",
//     method : ["GET", "PUT", "POST", "DELETE"],
//     allowedHeaders: ["Content-Type"]
// }))

app.use(cors());

app.use("/books", booksRoute);
app.use("/users", usersRoute);

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("welcome too mern");
})

