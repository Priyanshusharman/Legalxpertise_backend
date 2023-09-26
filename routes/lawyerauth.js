const express = require("express")
const router = express.Router()
const Lawyer = require("../models/Lawyer")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchLawyer = require("../middleware/fetchLawyer.js")
const JWT_SECRET = "sximportent"

// ROUTE 1: Create a Lawyer using:POST "/api/lawyerauth/createLawyer". No login required
router.post("/createLawyer", [body('email', "Enter a valid email").isEmail(), body('name', "Enter a valid name").isLength({ min: 3 }), body('password', "Password must be atleast 5 characters").isLength({ min: 5 }),body('state','enter valid state').isLength({ min: 5 }),body('pincode','enter valid pin').isLength(6), body('state', "Enter a valid state name").isLength({ min: 3 }), body('casewon', "Enter a integer").isNumeric(), body('takencase', "Enter valid token case number").isNumeric(), body('Lawyerid', "PLawyer id invalid").isLength({ min: 5 }),body('bio', "min 100 words").isLength({ min: 100 })
], async (req, res) => {
    let success = false;
    //If there are errors, return Bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //Check weather the Lawyer with this email exists already
    try {
        let lawyer = await Lawyer.findOne({ email: req.body.email })
        if (lawyer) {
            return res.status(400).json({ success, error: "Email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt)
        lawyer = await Lawyer.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
            pincode:req.body.pincode,
            state:req.body.state,
            casewon:req.body.casewon,
            takencase:req.body.takencase,
            typesoflawyer:req.body.typesoflawyer,
            Lawyerid:req.body.Lawyerid,
            pay:req.body.pay,
            bio:req.body.bio
        })
        const data = {
            id: lawyer.id
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authtoken , lawyer})
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

// ROUTE 2: Authenticate a Lawyer using:POST "/api/auth/lawyerlogin". Login required
router.post("/loginlawyer", [body('email', "Enter a valid email").isEmail(), body('password', "Password cannot be blank").exists()
], async (req, res) => {
    //If there are errors, return Bad request and the errors
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body
    try {
        let lawyer = await Lawyer.findOne({ email })
        if (!lawyer) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, lawyer.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }
        const data = {
            id: lawyer.id
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authtoken })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

// ROUTE 3: Authenticate a Lawyer using:POST "/api/auth/getLawyer". Login required
router.post('/getLawyer', fetchLawyer, async (req, res) => {
    try {
        const lawyerId = req.lawyer.id
        const lawyer = await Lawyer.findById(lawyerId).select("-password")
        res.json(lawyer)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

module.exports = router