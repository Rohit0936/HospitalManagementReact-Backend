    const bodyParser = require("body-parser");
    let express=require("express");
    let app=express();
    let db=require("./config/db.js")
    let cors=require("cors");
    let cookie=require("cookie-parser");
    let routes=require("./routes/regroutes.js");
    require("dotenv").config();

    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
    app.use("/public",express.static("public"))
    app.use(cors({
        origin:"https://hospital-management-react-rouge.vercel.app",
        credentials:true
    }))

    app.use(cookie());
    app.use("/",routes);

    module.exports=app;