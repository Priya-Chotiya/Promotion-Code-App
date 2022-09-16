const mongoose = require("mongoose");

const dbConnect = () =>{
    const connectionParams = {useNewUrlParser:true};
    mongoose.connect(process.env.DB , connectionParams);
    mongoose.connection.on("connected", () =>{
        console.log("Connected Sucessfully");
    })

    mongoose.connection.on("error", (err) =>{
        console.log("Erro while connecting to database" + err);
    })
    mongoose.connection.on("disconnected", () =>{
        console.log("Database disconnected");
    })
}

module.exports = dbConnect;