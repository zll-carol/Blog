const mongoose = require("mongoose");

const UserShema = new mongoose.Schema({
	userName: {
		type: String,
		requried: true,
	},
	password: {
		type: String,
		required: true,
	},
	status: Boolean,
	createAt: {
		type: Date,
		default: Date.now,
	}
});

const UserModel = mongoose.model("user", UserShema, "user");
module.exports = UserModel;