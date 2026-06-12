import mongoose, { Schema } from "mongoose";

const medicalRecordSchema = new Schema({
    patient:{
        type: Schema.Types.ObjectId,
        ref:"Patient"
    },
    doctor:{
        type: Schema.Types.ObjectId,
        ref:"Doctor"
    },
    diagnosis:{
        type:String
    },
    prescriptions:{
        type: String
    },
    notes:{
        type: String
    },
    visitedDate:{
        type: Date
    }
},{timestamps: true})

export const MedicalRecords = mongoose.model("MedicalRecord", medicalRecordSchema)