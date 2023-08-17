const path_resolver = require("./path_resolver");
// implement about cache
const cache_path = [""];
module.exposts = cacher = (req,res,next)=>{
    const path = path_resolver(req.url);
    if(path == "getallpodcast"){
        // get it from cache and send to user
    }else if (path == "getallcategory"){
        // get if from cache and send to user
    }
    /// ..........................
}