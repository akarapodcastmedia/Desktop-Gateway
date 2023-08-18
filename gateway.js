
// ================================|| ___________ DESKTOP BECKEND FOR FRONT END ___________||=========================
//****************************************************************************************************************** */
// | PURPOSE : acting as a gateway to serve core functionality for others services of AKARA PODCST
// | PROJECT : praticum
// | START AT DATE : 
// | FINISH AT DATE: 
// | LEADED BY : MR.KOR SOKCHEA
// | TEAM COLABORATORS :  -> TAN BUNCHHAY -> NUT VIRAK -> POK HENGLY -> PICH LYHEANG
// | API DESIGNER : MR. PICH LYHEANG
//******************************************************************************************************************* */

// PROJECT START IMPLEMENTING

//==================================================
// ALLOW ENV VERIABLE FILE AVAILABLE
//==================================================
require("dotenv").config();
const express = require("express");
const gateway = express();
const cors    = require("cors");
const helmet  = require("helmet");
const rateLimit = require("express-rate-limit");
const {authorization} = require('./authorization');
const route = require('./route');
//==================================================
// ASSIGN PORT 
//==================================================
const PORT = 6000 || process.env.PORT;
//  =================================================
//  GATEWAY MIDDLEWARES
// ==================================================
gateway.use(express.json());
gateway.use(cors());
gateway.use(express.urlencoded({extended : true}));
gateway.use(helmet());
gateway.use(rateLimit({
    windowMs : 2 * 60 * 1000,
    max : 500
}));
const load_handler = require('./loadbalancer');
const {discover_service_urls,playlist_service_urls,trending_service_urls,favourite_service_urls} = require('./serverUrl');
//============================================ \
// SERVICE FORWARDING BY LOADBALACER
//============================================\
//gateway.use("/discover",route);
gateway.use("/discover",authorization,(req,res)=> load_handler(req,res,discover_service_urls,"discover"));
gateway.use("/playlist",authorization,(req,res)=> load_handler(req,res,playlist_service_urls,"playlist"));
gateway.use("/favourite",authorization,(req,res)=> load_handler(req,res,favourite_service_urls,"favourite"));
gateway.use("/trending",authorization,(req,res)=> load_handler(req,res,trending_service_urls,"trending"));

//============================================\
//      SERVER PORT OF THIS BFF 
//\============================================
gateway.listen(PORT,()=>console.log("BFF DESKTOP IS BEING LISTENED ON PORT  : 6000"));




//                   //======================================\\
//                   ||       END OF BFF IMLEMENTATION       ||
//                   \\======================================//