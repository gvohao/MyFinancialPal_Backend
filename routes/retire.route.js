const router = require("express").Router()
const RetireModel = require("../models/retire.model")

router.get("/", async (req, res) =>{
    try{
        let retirePlan = await RetireModel.find({})
        console.log("random")
        // console.log(req.params)
        res.status(200).json({retirePlan : retirePlan})
        // res.send("hit")
    }catch(e){
        console.log(e)
        res.status(404).send({"message":"e"})
    }
})

router.post("/plan", async(req, res)=>{
    try{
        let retirePlan = new RetireModel(req.body)
        await retirePlan.save()
        res.redirect("/")
        res.end()
    }catch(e){
        console.log(e)
    }
})
module.exports = router
