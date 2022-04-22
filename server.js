import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import formidable  from "formidable";
import Register from "./src/Routes/Register.js"
import Login from "./src/Routes/Login.js"
import User from "./src/Routes/User.js"
import Message from "./src/Routes/Message.js"




dotenv.config()

const app = express();

app.use(cors());

app.use(Register);

app.use(Login);

app.use(User);

app.use(Message);


const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}


const port = process.env.PORT || 5000;

if((process.env.NODE_ENV = "production")){
    app.use(express.static("client/build"));
    app.get("*", (req,res) =>{
        res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
    })
}

 mongoose.connect(process.env.mongoURI, options).then((res) =>{
    return app.listen(port, () => {
        console.log(` listening on port ${port}`)
      })
 }).catch((err) =>{
    console.log(err)
 }) 
    