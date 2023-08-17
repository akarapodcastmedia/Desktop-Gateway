const express = require("express");
const route = express.Router();

route.get("/get/data",(req,res)=>{
    return res.json({
        error: true,
        message : "welcome to routing handling"
    })
})

module.exports = route;