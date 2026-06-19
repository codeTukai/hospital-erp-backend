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

// pre() is a Mongoose middleware (hook) that runs automatically
// before a specified operation such as save, update, or delete.
//Access token did not save into database

userSchema.pre("save", async function(next){ //pre is a hook which works when its require to execute any operation then call pre//pre() is a middleware (hook) that runs before a specific Mongoose operation is executed.
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
    
    
})

userSchema.methods.isPasswordCompared = async function(password){
  return await bcrypt.compare(password, this.password)
}

//payload--A payload is the actual data being transmitted in a request, response, token, or message. It contains the useful information that the sender wants to deliver to the receiver.
userSchema.methods.generateAccessToken = function(){
     return jwt.sign(
        {
            _id : this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
            mobile: this.mobile
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
            
        }
     )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this.id,
            //_id -> my payload data = this._data from database
           
        },
        process.env.ACCESS_REFRESH_SECRET,
        {
            expiresIn:process.env.ACCESS_REFRESH_EXPIRY
        }
     )
}

//  userSchema.methods.generateRefreshToken = function(){
//    return jwt.sign(
//         {
//             _id : this._id,
           
//         },
//         process.env.REFRESH_TOKEN_SECRET,
        
//         {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//         }
//     )
// }


export const User = mongoose.model("User", userSchema)