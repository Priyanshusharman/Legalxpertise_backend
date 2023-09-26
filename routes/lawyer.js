const express = require("express")
const router = express.Router()
const Lawyer = require("../models/Lawyer")
const fetchUser = require("../middleware/fetchUser.js")

// ROUTE 1: Authenticate a User using:POST "/api/search/getUser". Login required
router.post('/criminallawyer', fetchUser, async (req, res) => {
    try {
    
        const Lawyer = await Lawyer.find({typesoflawyer:"criminal"}).select("-password,email")
        res.json(Lawyer)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

module.exports = router