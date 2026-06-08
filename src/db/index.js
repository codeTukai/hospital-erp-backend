import mongoose from "mongoose";
import { DB_NAME } from '../constants.js'

const connectedDB = async () => {
    console.log("uri",process.env.MONGODB_URI);
    
    try {
        const databaseInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(databaseInstance);
        

        console.log(`\n Database successfully Connected !! DB HOST: ${databaseInstance.connection.host}`);

    } catch (error) {
        console.log("Mongodb connection Failed", error);
        process.exit(1)
    }
}

export default connectedDB