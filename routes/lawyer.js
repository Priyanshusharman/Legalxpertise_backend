const express = require("express")
const router = express.Router()
const Lawyer = require("../models/Lawyer")
const fetchUser = require("../middleware/fetchUser.js")

// ROUTE 1: Authenticate a User using:POST "/api/search/getUser". Login required
router.get('/criminallawyer',async (req, res) => {
    try {
    
        const lawyer = await Lawyer.find({typesoflawyer:"criminal"}).select("-password")
        res.json(lawyer)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

module.exports = router