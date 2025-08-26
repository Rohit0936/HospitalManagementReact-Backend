let model=require("../model/regmodel");

class login{

     login(data)
    {
      return model.login(data); 
    }
}

module.exports=login;