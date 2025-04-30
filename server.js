import express from 'express'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoter from './routes/user.js';
import blogRouter from './routes/blog.js';
import { config } from 'dotenv';
import cors from 'cors';

const app = express();
// const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';


// app.use(cors({
//   origin: FRONTEND_URL,
//   credentials: true
// }));


app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true 
}));

config({
    path:'./data/config.env'
})

mongoose.connect(process.env.MONGO_URL, {
    dbName: "MERN_2025_Project"
}).then(() => console.log("MongoDB is Connected!"))

// userRouter
app.use('/api/users',userRoter)

// blogRouter
app.use('/api/blogs',blogRouter)

//MVC = MODEL VIEWS CONTROLLS
app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))