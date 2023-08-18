require("dotenv").config();
const jwt = require("jsonwebtoken");
 function authorization(req,res,next){
    const token = req.header('Authorization');
    if(token == null){
        res.json({
            error   : true,
            message : "Accesss  was denied , required input token in authorization header along the request."
        })
    }else{
          // check if there is token but wrong format of Bearer token pass 
          try{
            // if has the right format of token
            const get_token = token.split(" ")[1];
            if(token.split(" ")[0] =="bearer" || token.split(" ")[0] =="Bearer" ){
                jwt.verify(get_token,process.env.PROGRAM_TOKEN_SECRET,(error,decoded_data)=>{
                    if(error){
                        res.json({
                            error : true,
                            message : error.message
                        })
                    }else{
                        next();
                    }   
                })
               
            }else{
                return  res.json({
                        error : true,
                        message : "invalid type of token please use bearer or Bearer"
                })
            }
          }catch(e){
                res.json({
                    error : true,
                    message : "please input token in the formt of Bearer token.",
                    eror : e.message
                })
          }
    }
}
module.exports = {authorization};