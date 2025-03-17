import express from "express";
import {createServer} from "node:http";
import {Server } from "socket.io";
import mongoose from "mongoose";
import cors from 'cors';
import userRoutes from "./routes/users.route.js"

import { connectToSocket } from "./controllers/socketManger.js";


const app=express();
//server and socket are running independently we have to connect them
const server=createServer(app);
const io=connectToSocket(server);

app.set("port",(process.env.PORT || 8000));

// CORS (Cross-Origin Resource Sharing) is a security feature in web browsers that controls how resources (like APIs) can be requested from a different origin (domain, protocol, or port) than the one the page is served from.
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}))


app.use("/api/v1/users",userRoutes);



const start= async ()=>{
    const connectiondb=  await mongoose.connect("mongodb+srv://jugnusaini1534:YgHUjRZbz6r1Vee9@cluster0.ukocr.mongodb.net/");
    console.log(`MONGO connected DB host: ${connectiondb.connection.host}`);
    server.listen(app.get("port"),()=>{
        console.log("listening on port 8000") 
        
    });
}

start();