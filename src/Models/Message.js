import mongoose from "mongoose"

const messageSchema = mongoose.Schema({
    id: {type: String, required: true, unique: true},
    
    message: [{
    from : String,
    to: String,
    msg: String, 
    time: Date,   
    }],
   
    
})

const messageModel = mongoose.model('message', messageSchema)
export default messageModel