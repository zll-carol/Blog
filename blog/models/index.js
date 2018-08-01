const mongoose = require("mongoose");
const UserModel = require("./user");

const url = "mongodb://localhost:27017/school";

mongoose.Promise = global.Promise;

mongoose.connect(url, {
	useMongoClient: true,
});

// 检查数据库 user 表是不是为空，如果为空，插入测试数据
UserModel.count()
	.then((num) => {
		if (num === 0) {
			const admin = new UserModel({
				username: "admin",
				password: "admin",
			});
			//存储数据的方法一：
			admin.save((err) => {
				console.log("Error::", err);
			});

			//存储数据的方法二：
			// UserModel.create(admin,(err)=>{
			// 	console.log("Error::",err);
			// })
		}
	})
	.catch((err) => {
		throw (err);
	});

exports.UserModel = UserModel;