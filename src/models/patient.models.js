import mongoose, {Schema} from "mongoose";

const patientSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    patientId: {
        type: String,
        required: true
    },
    age:{
        type: String,
        
    }

}, {timestamps: true})

export const Patient = mongoose.model("Patient", patientSchema) 