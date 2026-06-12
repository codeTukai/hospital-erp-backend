import mongoose, {Schema} from "mongoose";

const doctorSchema = new Schema({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    specialization:{
        type: String
    },
    experienced:{
        type: String
    },
    qualification:{
        type: String
    },
    experience:{
        type: Number
    },
    consultationFees:{
        type: Number
    },
    availableDate:{
        type:[String]
    },
    availableTime:{
        type: String
    }

},{timestamps})

export const Doctor = mongoose.model("Doctor", doctorSchema)