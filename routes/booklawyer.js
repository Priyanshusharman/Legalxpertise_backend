const express = require("express")
const router = express.Router()
const Booking = require("../models/Booking")
var jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser.js")
const JWT_SECRET = "sximportent"