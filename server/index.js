import express from "express";
import * as dotenv from "dotenv";
import cors from 'cors';
dotenv.config(); // to pull things from .dotevn file

const  app = express();
// adding additinal middlewares.
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.get('/',async (req,res)=>{
    res.send("Hello From AI image Generator");
})

const startServer = async ()=>{
    app.listen(8000,()=>{
        console.log('Server has started');
    })
}

startServer();