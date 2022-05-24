import mongoose from "mongoose"
require("dotenv").config()

let connectDb = async (url) => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: "true",
        // useCreateIndex: true,
    }, () => {
        console.log("connect db succes");
    });
}


module.exports = {
    connectDb: connectDb
}