
import mongoose from "mongoose"

const registerSchema = mongoose.Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number, default: 18},
    pass: {type: String, required: true},
    loc: {type: String, default: ["Nigeria"] },
    photo: {type: String},
    photoId: {type: String},
    gender: {type: String, default:["male"] },
    interest: {type: String},
    about: {type: String},
    req: { type: Array, default: []},
    hobby: { type: Array, default: ["tinderC"]},
    friends: { type: Array, default: []},
    msg: { type: Array, default: []},
    reg: { type: Date, default: Date.now}
    
})

const userModel = mongoose.model('user', registerSchema)
export default userModel