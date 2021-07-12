const router = require('express').Router()
const UserModel = require("../models/user.model")


router.get("/:id", async (req, res) => {
    try {
        let user = await UserModel.findById(req.params.id)
            // .populate("user", "email")
            .populate("user", "displayName")
        res.status(200).json({user})
    } catch(e) {
        console.log(e)
        res.status(400).json({"message" : "error in request"})
    }
})

module.exports = router
