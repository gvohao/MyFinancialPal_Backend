const mongoose = require('mongoose')
const { Schema } = require("mongoose")
const bcrypt = require('bcrypt')

const retireSchema = new Schema({
    retireExpense:{type:Number},
    retireAge:{type:Number},
    currentAge:{type:Number},
    lifeExpectancy:{type:Number},
    expectedReturns:{type:Number},
})

module.exports = mongoose.model("Retire", retireSchema)
