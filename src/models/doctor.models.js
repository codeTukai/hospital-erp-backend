import mongoose, {Schema} from "mongoose";

const doctorSchema = new Schema({
    
},{timestamps})

export const Doctor = mongoose.model("Doctor", doctorSchema)