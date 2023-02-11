const mongoURI = "mongodb://localhost:27017/notebook";
const mongoose = require('mongoose');

const connectToMongo = ()=>{
    mongoose.connect(mongoURI , ()=>{
        console.log("Connected Successfuly! ");
    })
}

module.exports = connectToMongo;