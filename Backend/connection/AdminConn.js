const mongoose=require("mongoose")

 
async function AdminConnect(){
    await mongoose.connect("mongodb://localhost/admin")
    console.log("mongodb connected adminconnection")
}
AdminConnect()


const Schema=mongoose.Schema
const ObjectId=Schema.ObjectId

const AdminSchema=new Schema({
    image:{
        data: Buffer,
        contentType: String
    },
    email:String,
    password:{type:String,min:5,max:16}
})

const adminmodel=mongoose.model("admincoll",AdminSchema)

module.exports=adminmodel