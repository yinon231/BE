const url = require('url');
const controller=require('./controller');
const {logSuccess,logError}=require('./logger');
const { error } = require('console');
const router=(req,res)=>{
   logSuccess.info(`Received request: ${req.method} ${req.url}`);
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.path;
     if(req.method==='GET' && path==='/donation'){  
        controller.getAllDonations(req,res); 
     }
     else if(req.method==='GET' && path==='/donation?id='+parsedUrl.query["id"]){
        controller.getAllDonationsById(req,res, parsedUrl.query["id"]);
     } 
     else if(req.method==='POST' && path==='/donation'){
        controller.createDonation(req,res);
     }
     else if(req.method==='PUT' && path==='/donation'){
        controller.updateDonation(req,res);
     }
     else if(req.method==='DELETE' && path==='/donation'){
        controller.deleteDonation(req,res);
     }
    else{
        res.writeHead(404,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:"Route not found"}));
        logError.error(`Response status: ${res.statusCode}`);
    }
}
module.exports={router};