import mongoose from "mongoose";
const username = encodeURIComponent("shubham19kushwaha");
const password = encodeURIComponent("@Tmagnum21");
const CONNECTION_URL = `mongodb+srv://${username}:${password}@memories.qifgzw6.mongodb.net/?retryWrites=true&w=majority`; 
const connectDb = ()=>{
    mongoose.set('strictQuery',true);
    mongoose.connect(CONNECTION_URL).then(()=>{
        console.log("DataBase connected Successfully");
    }).catch((err)=>{
        console.log(err);
    })
}
export default connectDb;