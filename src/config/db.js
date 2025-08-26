let mysql=require("mysql2");
require("dotenv").config();

let conn=mysql.createConnection({

    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

conn.connect((err)=>{
    if(err)
    {
        console.log("Database Connection Failed.......");
    }
    else{
        console.log("Database Connected....");
    }
})

module.exports=conn;