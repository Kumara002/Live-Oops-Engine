const mongoose=require("mongoose")

 
async function OfferConnect(){
    await mongoose.connect("mongodb://localhost/admin")
    console.log("mongodb connected Offerconnection")
}
OfferConnect()


const Schema=mongoose.Schema
const ObjectId=Schema.ObjectId

const OfferSchema=new Schema({
    OfferId:{type:String, require:true},
    OfferTitle:{type:String, require:true},
    OfferDescription:{type:String, require:true},
    OfferSort:{type:Number, require:true},
    OfferImage:{type:String,default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCot2NRE1TBGhjPz1nGgYm0f0KctqLoxkTj7b2KumOEg&s"},
    Content:[String],
    Schedule:{ 
        "DaysOfWeek":{type:Array,require:true, default:[0]},
        "DaysOfMonth":{type:Array,require:true, default:[0]},
        "DaysOfYear":{type:Array,require:true, default:[0]}
    },
    target:{
        "age":{type:Number,require:true, default:0}, 
        "installedDays":{type:Number,require:true, default:0 }
    },
    pricing:[{"currency":{type:String,default:"coins"},"coins":{type:Number,default:0}},{"currency":{type:String,default:"gems"},"gems":{type:Number,default:0}}]

})

const Offermodel=mongoose.model("offercoll",OfferSchema)

module.exports=Offermodel