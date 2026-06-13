import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jsw from 'jsonwebtoken'

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
        trim: true
    },
    mobile:{
        type :String,
        required: true,
        default: null
    },
    password:{
        type: String,
        required: [true, "Password is required!"],
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

userSchema.pre("save", async function(next){ //pre is a hook which works when its require to execute any operation then call pre//pre() is a middleware (hook) that runs before a specific Mongoose operation is executed.
    if(this.isModified("password")){

        this.password = bcrypt.hash(this.password, 10)
        next()
    }
    next()
})

export const User = mongoose.model("User", userSchema)