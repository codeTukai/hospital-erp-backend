import dotenv from "dotenv";
import connectedDB from "./db/index.js";

dotenv.config({ path: "./.env" });

import {app} from './app.js'

const PORT = process.env.PORT || 8000
connectedDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`SERVER RUNNING ON: ${PORT}`);
    })
})
.catch((error)=>{
    console.log("DB connection Failed!!", error);
})