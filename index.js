let app=require("./src/app.js");

app.listen(process.env.PROT,"0.0.0.0",(err)=>{
   if(err)
   {
     console.log(err);
   }
   else
   {
     console.log("Server Started.........."); 
   }
     
   
})