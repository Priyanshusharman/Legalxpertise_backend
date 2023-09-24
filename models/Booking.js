const mongoose = require("mongoose")
const { Schema } = mongoose;
const Booking = new Schema({
    userid: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ],
    lawyerid: [
        { type: Schema.Types.ObjectId, ref: 'Lawyer' }
    ],
    date: {
        type: Date,
        default: Date.now
    }

})
const booking = mongoose.model("booking", Booking)
module.exports = booking;