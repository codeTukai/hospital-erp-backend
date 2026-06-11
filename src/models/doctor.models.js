import mongoose, {Schema} from "mongoose";

const doctorSchema = new Schema({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps})

export const Doctor = mongoose.model("Doctor", doctorSchema)