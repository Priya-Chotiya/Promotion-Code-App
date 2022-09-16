const mongoose = require("mongoose");

const promotionCodeSchema = new mongoose.Schema({
    promotionCode:{type:String , required:true},
    discount:{type:Number , required:true},
    status:{type:String , required:true},
    type:{type:String , required:true},
    startDate:{type:String , required:true},
    endDate:{type:String , required:true},
})

module.exports = mongoose.model("promotionCode" , promotionCodeSchema)