const mongoose = require('mongoose')
const { Schema } = require("mongoose")

const retireSchema = new Schema({
    userId:{type: Schema.Types.ObjectId, ref:"Users"},
    displayName:{type: Schema.Types.ObjectId, ref:"Users"},
    entryDate:{type:Date},
    currentFund:{type:Number},
    retireExpense:{type:Number},
    retireAge:{type:Number},
    currentAge:{type:Number},
    accumulationPeriod:{type:Number},
    lifeExpectancy:{type:Number},
    investReturn:{type:Number, default: 0.05},
    retireFunds:{type:Number},
    annualSavings:{type:Number},
    infAdjRetireFunds:{type:Number},
    infAdjAnnualSavings:{type:Number},
    annualInflation:{type:Number},
    cumulativeInflation:{type:Number}
})

module.exports = mongoose.model("Retire", retireSchema)
