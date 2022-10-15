import express  from "express";
import formidable  from "formidable";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import Register from "../Models/Register.js"


dotenv.config()

cloudinary.config({ 
    cloud_name: process.env.CLOUDNAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SEC,
    secure: true
  })


const router = express.Router()


router.post("/register", (req, res) =>{
    const form = new formidable.IncomingForm()
    form?.parse(req, async(err, fields, files) =>{

        const {firstName, lastName, hobby, interest, gender, about, age, location, password, email, confirmpassword, } = fields;
        const { photo } = files;

        
         try {
            if(firstName === '' || email === '' || lastName  === '' || password  === '' || confirmpassword  === ''){
                return res?.json({msg: 'enter all fields'})
             }

             const checkEmail = await Register.findOne({email: email})

             if(checkEmail){
                return res?.json({msg: 'Email Already Exist'})
             }
    
            if( password.length <= 5 ){
                return res?.json({msg: 'password must be greater than 5'})
             }
    
            if( password  !== confirmpassword ){
                return res?.json({msg: 'password must match'})
             }
            
             if(photo !== ''){
                await cloudinary?.v2?.uploader?.upload( photo?.filepath, {folder:'tinderclone' },  function(error, result) {
             
                    const imgUrl = result?.secure_url || ''
                    const imgId = result?.public_id || ''
    
                    const user =  new Register({
                        fname: firstName,
                        
                        lname: lastName,
                        age: age,
                        email: email,
                        pass: password,
                        photo: imgUrl ,
                        photoId: imgId ,
                        loc: location,
                        about: about,
                        interest: interest,
                        gender: gender, 
        
                    })
    
                    const savedUser = user.save()
    
                     return res?.status(200)?.json({msg: 'account successfully created', validate: user})
                    
    
                 
                } )
             }
             
        } catch (error) {
            res?.json({msg: error.message})
        }
       
             
    })
})

router.put("/:id", async (req, res) =>{

    const form = new formidable.IncomingForm()

    form.parse(req, async(err, fields, files) =>{

        const { id } = req.params
        
        const { interest } = fields


        try {
            const users = interest !== "both" ?  await Register.find({ gender: interest, _id: {$ne: id}}) : await Register.find({ _id: {$ne: id}})
          res.status(201).json(users)
        } catch (error) {
          res.status(400).json(error.message)
        }
    })

   
   

    
})

export default router


