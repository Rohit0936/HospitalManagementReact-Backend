let model = require("../model/regmodel");
let regService = require("../services/regData");
let login = require("../services/login");
let bcrypt = require("bcrypt");
let fs = require("fs");
let path = require("path");
let jwt = require("jsonwebtoken");



exports.regata = ((req, res) => {

    //console.log(req.body)
    let { name1, email1, contact1, password1 ,specialization,experience,role,aid} = req.body;


    let r = new regService();
    let image = path.basename(req.file.path);

    image = "/upload/" + image;
    let pass = bcrypt.hashSync(password1, 8);

    r.regData(email1.trim(), pass.trim(), name1.trim(), contact1.trim(),specialization,experience,image,role,aid).then((result) => {
        res.send("true");
    }).catch((err) => {
        let filepath = path.join("C:\\ReactProject\\HospitalManagementReact\\Backend\\public", image)
        fs.unlink(filepath, (err) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {

            }
        })
        res.send("false");
    });
})

exports.login = ((req, res) => {
    let [username, password] = req.body;
    let l = new login();
    l.login(username).then((result) => {
        let flag = bcrypt.compareSync(password, result.user_password)
        if (flag) {
            let token = jwt.sign({
                name: result.username,
                pass: result.user_password
            }, process.env.SECRET_KEY, { expiresIn: process.env.TIME });

            res.cookie("xyz", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.send(result);
        }
        else {
            
            res.send([]);
        }
    }).catch((err) => {
        console.log(err);
        res.send("false");
    })
})

exports.checkUser=((req,res)=>{

    let token=req.cookies.xyz;
    let data;
    
    if(typeof(token)=='undefined')
    {

          res.send([]);
    }
    else
    {   
        jwt.verify(token,process.env.SECRET_KEY,(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
           // console.log(result)
          
          data=[result.name,result.pass];
               
        }
        let l = new login();
    l.login(data[0]).then((result1)=>{ 
               // console.log(result1)
                res.send(result1)
          }).catch((err)=>{
            console.log(err);
          })
    })

    }
})

exports.getData=((req,res)=>{

      model.getData(req.query.role,req.query.aid).then((data)=>{
        res.send(data);
      }).catch((err)=>{
        console.log(err);
      })
})

exports.logout=((req,res)=>{
res.clearCookie("xyz");
res.send("true");
 })