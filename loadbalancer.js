const axios = require("axios");
// define load balancer 
let server_observer = 0;
const load_handler = async(req,res,urls,addition_path)=>{
    // get url as an array
    const urls_server = urls;
    const {method , url,headers,body} = req;
    try{
        const URL =`${urls_server[server_observer]}/${addition_path}${url}`;
        console.log(URL);
        if(method=="GET"){  
                const data = await axios.get(`${URL}`,{headers:{
                    "content-type" : "application/json",
                    "Authorization" : headers.authorization
                }});
                server_observer = (server_observer+1) % urls_server.length;
                return res.json(data.data);
           
        }else if(method=="POST"){
            const data = await axios.post(`${URL}`,body,{
                headers : {
                    "content-type" : "application/json",
                    "Authorization" : headers.authorization
                }
            });
            server_observer = (server_observer+1) % urls_server.length;
            return res.json(data.data);
        }else{
            return res.json({
                error : true,
                message : "No support this method in any cases"
            });     
        }
           
    }catch(e){
        console.log("one provided server is down,try to user another one instead...");
        server_observer = (server_observer+1) % urls_server.length;
        await load_handler(req,res,urls);
    }
    
}
module.exports = load_handler;