const express=require("express")
const {body,validationResult}=require("express-validator")
const bodyParser=require("body-parser")
const bcrypt=require("bcrypt")
const admin=require("../connection/AdminConn")

const routes=express.Router()

routes.use(bodyParser.json())
routes.use(bodyParser.urlencoded({extended:false}))

routes.get("/test",(req,res)=>{
    try{
        res.sendStatus(200)
    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
})

routes.post("/reg",body("name").isAlpha(),body("email").isEmail(),body("password").isLength({min:5,max:16}),
async(req,res)=>{
    try{
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            //check email is already present
            console.log(req.body)
            const {name,email,password}=req.body
            
            const user=await admin.findOne({email})
            if(user){
                return res.status(409).json({
                    status:"Failed",
                    messge:"User already exists"
                })
            }
            
            bcrypt.hash(password,10,async function(err,hash){
                if (err) {
                    return res.status(500).json({
                        status: "Failed",
                        message: err.message
                    })
                }
                const data=await admin.create({
                    name,
                    email,
                    password:hash
                })
                return res.status(200).json({
                    Status:"Success",
                    message:"Admin successfully registered",
                    data
                })
            })

    }catch(e){
        return res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
})

routes.post("/login",body('email').isEmail(),
async(req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {name,email,password}=req.body

        const user=await admin.findOne({email})
        if(!user){
            return res.status(400).json({
                status:"failed",
                message:"unknown user or user is not registered"
            })
        }
        //load hash from your password db
        bcrypt.compare(password,user.password,function(err,result){
            if(err){
                return res.status(500).json({
                    status: "Failed",
                    message: err.message
                })
            }
            if(result) {
                return res.status(200).json({
                    status: "Succces",
                    message: "Login successful"
                })
            }else {
                return res.status(400).json({
                    status: "Failed",
                    message: "Invalid credentails"
                })
            }
        })

    }catch(e){
        return res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
})

module.exports=routes;

