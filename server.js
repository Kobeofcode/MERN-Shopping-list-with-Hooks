const express = require ("express");
const mongoose = require("mongoose");
const Item = require("./models/item")
const app = express();
const items = require("./routes/api/items")
const path = require("path");

app.use(express.json());

//Database touch point
const db = "mongodb+srv://eddimo:Nikolatesla12@mycluster.clbv1.mongodb.net/Users?retryWrites=true&w=majority";
//Connecting to the database
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(res=>{console.log("Spojeni smo na Mongo Atlas")})



app.use("/api/items",items);
//Static if in production
if(process.env.NODE_ENV==="production"){
    //Static folder
    app.use(express.static("client/build"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    })
}
const port = process.env.PORT || 5000;
app.listen(port,()=>
    console.log(`Spojeni smo sa serverom na ${port}`))