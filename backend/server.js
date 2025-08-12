import { app ,server} from './socket/socket.js';
import dotenv from'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import connectToMongoDB from './db/connectToMongoDB.js';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import messageRoutes from './routes/message.routes.js';
import express from 'express';
const __dirname = path.resolve();
dotenv.config();





app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);
app.use(express.static(path.join(__dirname,"/frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
})
const PORT=process.env.PORT || 5000;

// app.get("/",(req,res)=>{
//     res.send("Hello world!!")
// });
server.listen(PORT,()=>
    {
        connectToMongoDB();
        console.log(`server is running on the port ${PORT}`);
    });