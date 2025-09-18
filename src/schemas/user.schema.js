import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword:{ type: String, required: true,},
    role: { type: String, required: true,default:"attendee", enum:["admin","organizer","attendee"]}, 
    avatar: { type: String,}
},{
  timestamps: true // automatically adds createdAt and updatedAt fields
})

const User = mongoose.model('User', userSchema);

export default User;