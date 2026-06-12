import mongoose, {Schema} from "mongoose";

const patientSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    patientId: {
        type: String,
        required: true,
        unique: true
    },
    age:{
        type: Number,
        default: null

    },
    gender:{
        type: String,
        enum : ["Male", "Female", "Transgender"]
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    address:{
        type: String
    },
    emergencyContactNo:{
        type: String
    },
    medicalHistory:{
        type: [String],
        default: []
    }

}, {timestamps: true})

export const Patient = mongoose.model("Patient", patientSchema) 