import dotenv from "dotenv";
import connectedDB from "./db/index.js";

dotenv.config({ path: "./.env" });


// console.log(process.env.MONGODB_URI);

connectedDB();