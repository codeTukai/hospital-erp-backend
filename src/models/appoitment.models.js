import mongoose, {Schema} from "mongoose";

const appointmentSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    doctor:{
        type: Schema.Types.ObjectId,
        ref:"Doctor"
    },
    appointment:{
        type: String
    },
    status:{
       type: String,
       enum:["PENDING", "CONFIRMED", "COMPLETE", "CANCELED"],
       default: null
    }

}, {timestamps: true})

export const Appointment = mongoose.model("Appointment", appointmentSchema)