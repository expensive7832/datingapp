import express  from "express";
import formidable  from "formidable";
import dotenv from "dotenv";
import Register from "../Models/Register.js"


dotenv.config()



const router = express.Router()


router.post("/login", (req, res) =>{
    const form = new formidable.IncomingForm()
    form?.parse(req, async(err, fields, files) =>{

        const {password, email} = fields;

    
    
        
         try {
            if(password === '' || email === ''){
                return res?.json({msg: 'enter all fields'})
             }
    
            const passCheck = await Register.findOne({pass: password});
            const emailCheck = await Register.findOne({email: email});
            const userCheck = await Register.findOne({email: email, pass: password});

            if(!emailCheck){
                res?.json({msg: 'Your email doesnt exist'})
            }else if(!passCheck){
                res?.json({msg: 'Your password doesnt match any account'})

            }else if(userCheck){
                res?.status(201)?.json({msg: 'Login successfully', info: userCheck})
            }

             
        } catch (error) {
            res?.json({msg: error})
        }
       
             
    })
})


export default router


