const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser.js")
const JWT_SECRET = "sximportent"
// ROUTE 1: Authenticate a User using:POST "/api/search/getUser". Login required
router.post('/criminallawyer', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

module.exports = router