import mongoose from "mongoose"
import { cache } from "react";
const MONGODB_URL=process.env.MONGODB_URL as string;
const connection={};

let cached =(global as any).mongoose;
if(!cached){
    cached=(global as any).mongoose={conn:null , promise: null};
}

async function connectToDatabase() {
        if(cached.conn){
            return cached.conn;
        }
        if(!cached.promise){
            const opts={
                bufferCommands:false,
            };
            cached.promise=mongoose.connect(MONGODB_URL, opts).then((mongoose)=>{
                return mongoose;
            });

        }
        cached.conn=await cached.promise;
        return cached.conn;
}
export default connectToDatabase;