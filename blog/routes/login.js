const express=require("express");
const {UserModel} =require("../models");

const login=express.Router();

login.get("/",function(req,res,next){
	res.render("login");
});

login.post("/",function(req,res,next){
	const form=req.body;
	UserModel.findOne({username:form.user})
	.then((doc)=>{
		if(!doc){
			return res.render("login",{errMessage:"登录失败 该用户不存在"});
		}
	})
	.catch((err)=>{
		console.log("Error::",err);
		next(err);
	});
});

module.exports=login;