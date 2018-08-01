const express = require("express");
const fs = require("fs");
const path = require("path");
const favicon = require('serve-favicon');
const nunjucks = require("nunjucks");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const index = require("./routes/index");
const login = require("./routes/login");

const app = express();

nunjucks.configure("views", {
	autoescape: true,
	express: app,
});
app.set("view engine", "html");

// 配置session
app.use(session({
	// store: new MongoStore({
	// 	mongooseConnection: mongoose.connection
	// }),
	name: "Carp",
	secret: "123345ljgaotu09354u0",
	cookie: {
		maxAge: 60 * 60 * 1000
	},

	// 如果为true， 则每次请求都更行cookie的过期时间;
	rolling: true,

	// 如果为true, 则默认每次请求都强制保存session;
	resave: true,

	// true 表示 所有连接只要没有session对象，都自动生成一个；
	// false 表示 不会自动生成，只有调用req.session进行操作时才会生成；
	saveUninitialized: false,
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());

//根路径：
app.use(express.static(path.join(__dirname, "/public")));

//路由：
app.use("/", index);
app.use("/login", login);

//获取404错误处理：
app.use(function(req, res, next) {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

//其他错误处理都默认为500错误，即服务器错误
app.use(function(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") == "development" ? err : {};
	// res.status(err.status||500);
	// res.send(err);

	next(err);
});

console.log(app.get("env"));

module.exports = app;