const mongoose = require("mongoose");
// const mongoURI = "mongodb://0.0.0.0:27017/legalXpo";
const mongoURI = "mongodb+srv://aidpriyanshu:GjMK5Y0OE1g9Jj4E@legalxpertise.4fnl0il.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(console.log("Connected To Mongo Successfully"));
}

module.exports = connectToMongo;