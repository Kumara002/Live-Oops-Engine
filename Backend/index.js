const express=require("express")
const bodyParser=require("body-parser")
const adminRoutes=require("./routes/adminRoutes")
const cors=require("cors")
const fileupload=require("express-fileupload")
const path=require("path")
const offer=require("./connection/OfferConn")
const multer=require("multer")
const { AsyncResource } = require("async_hooks")


const app=express()

app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '_' + file.originalname;
      cb(null,filename)
    }
  })

var upload = multer({ storage: storage })

app.use("/admin",adminRoutes)

app.get("/list",async(req,res)=>{
    try{
        const data=await offer.find()
        res.status(200).json(data)

    }catch(e){
        res.status(500).json({
        status:e.message
        })
    }
})

app.get("/Offer",async(req,res)=>{
    try{
        console.log(req.query);
        const title=req.query.attribute
        const query=req.query.query
        const data =await offer.find({OfferTitle:query})
        res.status(200).json({
            "page":req.query.page,
            "has_more":"false",
            "offers":data
        })
       
    }catch(e){
        res.status(500).json({
        status:e.message
        })
    }
})

app.use(fileupload())

app.post("/Offer",async(req,res)=>{
    try{
        const {id,title,desc,sort,content,week,month,year,age,install,coins,gems}=req.body
        console.log(req.files)
        const {image_file}=req.files
        image_file.mv("./uploads/"+image_file.name,
        (err)=>{
        if(err){
            console.log({message:err})
        }
        else{
            console.log({message:"upload success"})
        }
        })
        const data=await offer.create({
            OfferId:id,
            OfferTitle:title,
            OfferDescription:desc,
            OfferSort:sort,
            OfferImage:`http://localhost:5000/images/${image_file.name}`,
            Content:content,
            Schedule:{ 
                "DaysOfWeek":week,
                "DaysOfMonth":month,
                "DaysOfYear":year
            },
            target:{
                "age":age, 
                "installedDays":install
            },
            pricing:[{"currency":"coins","coins":coins},{"currency":"gems",coins:gems}]
        
        })
        res.status(200).json(data)

    }catch(e){
        res.status(500).json({
        status:e.message
        })
    }  
})

app.put("/Offer/:Offerid",async(req,res)=>{
    try{
        const {id,title,desc,sort,content,week,month,year,age,install,coins,gems}=req.body
        console.log(req.files)
        console.log(req.params.Offerid)
        const {image_file}=req.files
        image_file.mv("./uploads/"+image_file.name,
        (err)=>{
        if(err){
            console.log({message:err})
        }
        else{
            console.log({message:"upload success"})
        }
        })
        const data=await offer.updateOne({OfferId:req.params.Offerid},{$set:{
            OfferId:id,
            OfferTitle:title,
            OfferDescription:desc,
            OfferSort:sort,
            OfferImage:`http://localhost:5000/images/${image_file.name}`,
            Content:content,
            Schedule:{ 
                "DaysOfWeek":week,
                "DaysOfMonth":month,
                "DaysOfYear":year
            },
            target:{
                "age":age, 
                "installedDays":install
            },
            pricing:[{"currency":"coins","coins":coins},{"currency":"gems",coins:gems}]
        
        }})
        res.status(200).json(data)

    }catch(e){
        res.status(500).json({
        status:e.message
        })
    }  
})

app.delete("/Offer/:id",async(req,res)=>{
    try{
        console.log(req.params.id)
    const data=await offer.deleteOne({OfferId:req.params.id})
    res.status(200).json(data)
    }catch(e){
        res.status(500).json({
        status:e.message
        })
    }  
})

app.get("/search/:search",async(req,res)=>{
    try{
        console.log(req.params.search)
        const data=await offer.find({OfferId:req.params.search})
        res.status(200).json(data)
    }catch(e){
        res.status(500).json({
        status:e.message
        })
    }  
})

app.get("/player",async(req,res)=>{
    try{
        console.log(req.query.age,req.query.install)
        const data=await offer.find({target:{"age":parseInt(req.query.age),"installedDays":parseInt(req.query.install)}})
        // console.log(data)
        res.status(200).json(data)
    }catch(e){
        res.status(500).json({
        status:e.message
        })
    }  
})

app.get("/images/:fileName",(req,res)=>{
    console.log("hello i'm here")
    console.log(`./uploads/${req.params.fileName}`)
    res.sendFile(path.join(__dirname,`./uploads/${req.params.fileName}`))

})

app.get("*",(req,res)=>{
    res.sendStatus(404)
})

app.listen(5000,()=>{console.log("port is listening")})




