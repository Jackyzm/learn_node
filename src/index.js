const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const moment = require('moment');
const bodyParser = require('body-parser');
const { initMongo } = require('./db');
const router = require('./router/index');

const app = express();
const env = process.env.NODE_ENV;

// 初始化mongo连接
initMongo();

// allow custom header and CORS 跨域解决
app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
	);
	res.header(
		'Access-Control-Allow-Methods',
		'PUT, POST, GET, DELETE, OPTIONS'
	);

	if (req.method === 'OPTIONS') {
		res.send(200);
	} else {
		next();
	}
});

// 设置log文件
// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
	skip(req, res) { return res.statusCode < 400; }
}));
const logName = env === 'development' ? `${moment().format('YYYY-MM-DD')}.log` : `${moment().format('YYYY-MM-DD HH:mm:ss')}.log`;
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../log', logName), { flags: 'a' });
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

// 中间件解析body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// 挂载路由
app.use('/api', router);

// 自定义404返回
app.use((req, res) => {
	res.status(404).json({
		code: 404,
		msg: 'Not Found'
	});
});

// 启动服务
app.listen(8000, () => {
	console.log('running at: http://localhost:8000');
});
