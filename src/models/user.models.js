import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique:true,
        tolowerCase: true,
        trim : true
    },
    fullName:{
        type: String,
        required: true,
    },
    mobile:{
        type : Number,
        required: true,
        default: null
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    role: {
    type: String,
    enum: ["admin", "doctor", "patient", "receptionist", "nurse"]
  },
   avatar: {
    type : String
   },
   refreshToken:{
    type: String
   }
},{timestamps: true})

export const User = mongoose.model("User", userSchema)