import express  from "express";
import formidable  from "formidable";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import Message from "../Models/Message.js"


dotenv.config()

cloudinary.config({ 
    cloud_name: process.env.CLOUDNAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SEC,
    secure: true
  })


const router = express.Router()


router.post("/message", (req, res) =>{
    const form = new formidable.IncomingForm()
    form?.parse(req, async(err, fields, files) =>{

        const {swipeId, loginId, message} = fields;

        const ids = swipeId > loginId ? swipeId + loginId : loginId + swipeId;

        try{
          const checkIds = await Message.findOne({id: ids})

          if(!checkIds){
            const newMessage = await Message({
                id: ids,
                message: {
                    from: loginId,
                    to: swipeId,
                    msg: message,
                    time: new Date().getTime()
                }
              })
              
              const send = newMessage.save()

              if(send){
                 res.status(200).json({msg: "newchat", })
              }

          }else{
            const msgUpdate = await Message.findOneAndUpdate({id: ids},{
              $push:{
                message:{
                  from: loginId,
                  to: swipeId,
                  msg: message,
                  time: new Date().getTime()
                }
              }
            })
              
              
              if(msgUpdate){
               res.status(201).json({msg: "sent"})
              }
          }

        } catch (error) {
            console.log({msg: error.message})
        }
       
             
    })
})

{/**
     //  const { photo } = files;
  
     //        if(photo !== ''){
       //         await cloudinary?.v2?.uploader?.upload( photo?.filepath, {folder:'tinderclone' },  function(error, result) {
       //      
       //             const imgUrl = result?.secure_url || ''
       //             const imgId = result?.public_id || ''
    //
       //             const user =  new Register({
       //                 fname: firstName,
       //                 lname: lastName,
       //                 age: age,
       //                 email: email,
       //                 pass: password,
       //                 photo: imgUrl ,
       //                 photoId: imgId ,
       //                 loc: location,
       //                 about: about,
       //                 interest: interest,
       //                 gender: gender, 
       // 
       //             })

*/}

export default router


