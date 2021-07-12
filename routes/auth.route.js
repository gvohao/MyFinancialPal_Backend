const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkUser = require("../lib/check")
const UserModel = require("../models/user.model")
require('dotenv').config()

router.get('/user', checkUser, async(req, res) => {
    try{
        let user = await UserModel.findById(req.user.id, "-password")
            // .populate('displayImage','itemImage')
        res.status(200).json({user})
    }catch(e){
        res.status(500).json({ message: "something went wrong"})
    }
})

router.post('/register', async (req, res) => {
    console.log("123")
    try {
        let existingUser = await UserModel.findOne({email: req.body.email})
        if (existingUser) {
            throw "User already exists."
            console.log(`user already exists- auth.route`)
        }
        if(req.body.password !== req.body.confirmPassword){
            throw "Passwords don't match."
            console.log(`passwords dont match- auth.route`)
        }
        let user = new UserModel(req.body)
        user.password = await bcrypt.hash(user.password, 10)
        await user.save()

        let token = jwt.sign({
            user: {
                id: user._id
            }
        }, process.env.JWTSECRET, {expiresIn: "10d"})
        console.log(`user created ${token}`)
        res.status(201).json({token: token, message: "User Created"})
    }// to include the else
    catch(error) {
        console.log(error)
        res.status(400).json({message: "error" })
    }
})

router.post('/login', async( req, res) => {
    try{
        console.log("hit the login")
        // console.log(req.body.email)
        let user = await UserModel.findOne({email: req.body.email})
        console.log(user)
        if(!user){
            console.log("User not found.")
            throw "User not found." //doesnt work if user wrong
        }
        if(!user.validPassword(req.body.password)){
            console.log("Invalid password")
            throw "Invalid Password."
        }
        let token = jwt.sign({
            user : {
                id: user._id,
            }},process.env.JWTSECRET, {expiresIn: "3d"})
        res.status(200).json({token})
    }catch (error){
        console.log('HELLO')
        console.log(error)
        res.status(400).json({message: "error"})

    }
})


module.exports = router
