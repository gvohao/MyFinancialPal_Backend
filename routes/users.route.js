const router = require('express').Router()
const UserModel = require("../models/user.model")
const RetireModel = require("../models/retire.model")

router.get("/:id", async (req, res) => {
    try {
        let user = await UserModel.findById(req.params.id)
            .populate("retirementPlan")
        // console.log(req)
        res.status(200).json({user})
        console.log("yes")
    } catch(e) {
        console.log(e)
        res.status(400).json({"message" : "error in request"})
    }
})

// router.put("/edit/:id", async(req, res) => {
//     try{
//         console.log("yes hitting the edit route")
//         let retirePlan = await UserModel.findById(req.params.id)
//         console.log(req.params)
//     }catch(e){
//         console.log(e)
//     }
// })

router.delete("/delete/:id", async (req,res) => {
    try{
        let user = await UserModel.findById(req.params.id)
        console.log("in delete path")
        console.log(user)
        console.log(req.params.id)
        console.log("before retirement")
        user.retirementPlan = null
        // let retirePlan = await RetireModel.findById(user.retirementPlan)
        // await RetireModel.findByIdAndUpdate(user.retirementPlan,{$pull: {retirementPlan: { $in: []}}})
        // retirePlan = [12345]
        // console.log(retirePlan)
        // console.log(user.retirementPlan)
        // await UserModel.findByIdAndUpdate(req.params.id, { retirementPlan : user.retirementPlan }
        // console.log(user.retirementPlan[0])
        // user.retirementPlan = user.retirementPlan.filter(plan => plan !== retirePlan) //works
        console.log("kena")
        //another way
        // let foundIndex = user.retirementPlan.indexOf(planId => planId === retirePlan._id)
        //
        // user.retirementPlan = user.retirementPlan.splice(foundIndex, 1) //works too
        console.log(` now left with ${user}`)
        // await RetireModel.findByIdAndDelete()
        console.log("after remove")
        user.save()



        // console.log(req.params)
        res.status(200).json({user})
    }catch(e){
        res.status(400).json({"message" : "e"})
    }
})
module.exports = router
