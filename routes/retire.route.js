const router = require("express").Router()
const RetireModel = require("../models/retire.model")
const UserModel = require("../models/user.model")

router.get("/:id", async (req, res) =>{
    try{
        let retirePlan = await RetireModel.findById(req.params.id)
            .populate("userId","displayName")
        console.log("random")
        // console.log(req.params)
        res.status(200).json({retirePlan : retirePlan})
        // res.send("hit")
    }catch(e){
        console.log(e)
        res.status(404).send({"message":"e"})
    }
})

router.put("/edit/:id", async(req, res) => {
    try{
        console.log("yes hitting the edit route")
        let retirePlan = await RetireModel.findById(req.params.id)
        console.log(req.body)
        retirePlan.retireExpense = parseInt(req.body.retireExpense)
        retirePlan.retireAge = parseInt(req.body.retireAge)
        retirePlan.lifeExpectancy = parseInt(req.body.lifeExpectancy)
        retirePlan.investReturn = parseInt(req.body.investReturn)
        retirePlan.accumulationPeriod = parseInt(req.body.accumulationPeriod)
        retirePlan.retireFunds = parseInt(req.body.retireFunds)
        retirePlan.annualSavings = parseInt(req.body.annualSavings)
        retirePlan.infAdjRetireFunds = parseInt(req.body.infAdjRetireFunds)
        retirePlan.infAdjAnnualSavings = parseInt(req.body.infAdjAnnualSavings)

        retirePlan.save()
        res.status(200).json({retirePlan})
        // res.redirect("/portfolio")
    }catch(e){
        console.log(e)
        res.status(400).json({"message" : "e"})
    }
})

router.post("/plan", async(req, res)=>{
    try{
        let retirePlan = new RetireModel(req.body)
        await retirePlan.save()
        let user = await UserModel.findById(req.body.userId)
        if(user.retirementPlan){
            return res.status(400).json({"message" : "plan already exists"})
        }
        await UserModel.findByIdAndUpdate(req.body.userId,  { $set: { retirementPlan: retirePlan }})
        res.status(200).json({retirePlan})
    }catch(e){
        res.status(404).send({"message":"e"})
    }
})

// router.delete("/delete/:id", async (req,res) => {
//     try{
//         console.log("in delete path")
//         await RetireModel.findByIdAndDelete(req.params.id)
//         // console.log(retirePlan)
//         let user = await UserModel.findById(retirePlan.userId)
//         // console.log(user.retirementPlan)
//         res.status(200).json()
//     }catch(e){
//         res.status(400).json({"message" : "e"})
//     }
// })

router.delete("/delete/:id", async (req,res) => {
    try{
        console.log("in delete path")
        // let user = await UserModel.findById(req.params.id)
        await RetireModel.findByIdAndDelete(req.params.id)
        console.log(req.params.id)
        console.log("deleted")
        res.status(200).json({user})
    }catch(e){
        res.status(400).json({"message" : "e"})
    }
})


module.exports = router
