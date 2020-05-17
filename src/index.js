const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const moment = require('moment');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoDB } = require('./db');
const { jwtAuth } = require('./jwt/jwt');
const router = require('./router/index');
const user = require('./router/user');

const app = express();

// 初始化mongo连接
MongoDB.initMongo();

// allow custom header and CORS 跨域解决
// app.all('*', (req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
// 	);
// 	res.header(
// 		'Access-Control-Allow-Methods',
// 		'PUT, POST, GET, DELETE, OPTIONS'
// 	);

// 	if (req.method === 'OPTIONS') {
// 		res.send(200);
// 	} else {
// 		next();
// 	}
// });

// cors 跨域
app.use(cors());

// 设置log文件
const logDirectory = path.join(__dirname, '../log');
// ensure log directory exists
if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);

const env = process.env.NODE_ENV;
const logName = env === 'development' ? `${moment().format('YYYY-MM-DD')}.log` : `${moment().format('YYYY-MM-DD HH:mm:ss')}.log`;
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
	path.join(logDirectory, logName),
	{ flags: 'a' } // 保留原来的数据
);

// 自定义输出日志格式
app.use(morgan((tokens, req, res) => {
	console.log(tokens.response);
	return `${[
		`time: ${moment().format('YYYY-MM-DD HH:mm:ss')}`,
		`remote-addr: ${tokens['remote-addr'](req, res)}`,
		`remote-user: ${tokens['remote-user'](req, res)}`,
		`method: ${tokens.method(req, res)}`,
		`url: ${tokens.url(req, res)}`,
		`query: ${JSON.stringify(req.query)}`,
		`body: ${JSON.stringify(req.body)}`,
		`Authorization: ${req.headers.Authorization || req.headers.authorization} `,
		`content-type: ${tokens.req(req, res, 'content-type')}`,
		`origin: ${tokens.req(req, res, 'origin')}`,
		`HTTP/${tokens['http-version'](req, res)}`,
		`status: ${tokens.status(req, res)}`,
		`referrer: ${tokens.referrer(req, res)}`,
		`user-agent: ${tokens['user-agent'](req, res)}`,
		`useTime: ${tokens['response-time'](req, res)} ms`
	].join('\r\n')} \r\n`;
}, { stream: accessLogStream }));

//  log only 4xx and 5xx responses to console
if (env === 'development') {
	app.use(morgan('dev', {
		skip(_, res) {
			return res.statusCode < 400;
		}
	}));
}


// 中间件解析body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// 将返回结果统一封装返回
app.use((_, res, next) => {
	res.successResponse = (...args) => {
		if (!args.length) return res.status(200).send();
		if (args.length > 1) throw new Error('successResponse 只接受一个参数');
		const [data] = args;

		return res.status(200).json({
			code: 200,
			data,
			success: true
		});
	};

	res.errorResponse = (...args) => {
		let code = 500;

		const [errObj, status, message] = args;
		let msg = (errObj && errObj.message) || '未知错误';

		// 通过new Error 自己创建的 可预知的错误
		if (errObj.name === 'Error') code = 400;
		if (status) code = status;
		if (message) msg = message;

		const obj = {
			code,
			msg,
			success: false
		};
		return res.status(code).json(obj);
	};
	next();
});

// 验证jwt
app.use(jwtAuth, (err, _, res, next) => {
	if (err) {
		return res.status(401).json({
			code: 401,
			msg: '登陆信息异常，请重新登陆',
			err: err.code,
			success: false
		});
	}
	next();
});

// 挂载路由
app.use('/api', router);
// user 单独挂载 不验证权限
app.use('/', user);

// 自定义404返回
app.use((_, res) => {
	res.errorResponse(new Error('404 Not Found'), 404);
});

// 启动服务
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log('running at: http://localhost:8000');
});
