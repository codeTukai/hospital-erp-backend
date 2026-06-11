import mongoose, {Schema} from "mongoose";

const appointmentSchema = new Schema({
    
}, {timestamps: true})

export const Appointment = mongoose.model("Appointment", appointmentSchema)