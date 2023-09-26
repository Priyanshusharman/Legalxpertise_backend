const mongoose = require("mongoose")
const { Schema } = mongoose;

const Lawyerschema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    // image: {
    //     type: URL,
    //     default: null
    // },
    casewon: {
        type: Number,
        default: 0
    },
    takencase: {
        type: Number,
        default: 0
    },
    typesoflawyer: [{
        type: String
        // , required: true,
    }],
    Lawyerid: {
        type: String,
        required: true,
        unique: true
    },
    pay: {
        type: Number,
        required: true
    },
    bio:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

})
const Lawyer = mongoose.model("Lawyer", Lawyerschema)
module.exports = Lawyer