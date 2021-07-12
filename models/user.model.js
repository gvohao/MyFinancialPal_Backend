const mongoose = require('mongoose')
const { Schema } = require("mongoose")
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email:{type:String, required: true},
    password:{type:String, required: true},
    isAdmin:{type:Boolean, default: false},
    displayName:{type:String},
    retirementPlan:[{type: Schema.Types.ObjectId, ref:"Retire"}]
    // displayImage:{type: Schema.Types.ObjectId, ref: 'Items'},
})

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model("Users", userSchema)
