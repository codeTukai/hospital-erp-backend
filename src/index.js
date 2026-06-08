// require('dotenv').config()
import dotenv from 'dotenv'
import connectedDB from "./db/index.js";

dotenv.config({
  path: './.env'
});


connectedDB()