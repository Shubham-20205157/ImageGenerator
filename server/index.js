import express from "express";
import * as dotenv from "dotenv";
import cors from 'cors';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
dotenv.config(); // to pull things from .dotevn file
import connectDb from "./mongodb/connect.js";
const  app = express();
// adding additinal middlewares.
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use('/api/v1/dalle',dalleRoutes);
app.use('/api/v1/posts',postRoutes)
app.get('/',async (req,res)=>{
    res.send("Hello From AI image Generator");
})
const startServer = async ()=>{
    try{
        connectDb();
        app.listen(8000,()=>{
            console.log('Server has started');
        });
    }
    catch(error){
        console.log(error);
    }
    
}

startServer();