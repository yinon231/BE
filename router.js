const url = require('url');
const controller=require('./controller');
const logger=require('./logger');
const router=(req,res)=>{
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
        logger.info(`Response status: ${res.statusCode}`);
    }
}
module.exports={router};