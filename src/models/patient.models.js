import mongoose, {Schema} from "mongoose";

const patientSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    patientId: {
        type: String,
        required: true
    },
    age:{
        type: String,
        default: null

    },
    gender:{
        type: String,
        enum : ["Male", "Female", "Transgender"]
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "B+", "O+", "AB+", "AB-", "O-"],
    },
    address:{
        type: String
    },
    emergencyContactNo:{
        type: Number
    },
    medicalHistory:{
        type: [String]
    }

}, {timestamps: true})

export const Patient = mongoose.model("Patient", patientSchema) 