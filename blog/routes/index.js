const express=require("express");

const router=express.Router();

router.get("/",function(rq,res,next){
	// console.log("Session::",req.session);
	res.render("index");
});

module.exports=router;
