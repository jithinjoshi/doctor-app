import { connect } from "mongoose";


export const database = ()=>{
    try {
        connect(process.env.MONGODB).then(()=>{
            console.log('database connected successfully');
        })
    } catch (error) {
        console.log(error);
    }
}

