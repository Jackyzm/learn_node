const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Logger = require('./logger');
const MongoDB = require('./db');
const { jwtAuth } = require('./jwt');
const { useResponse } = require('./middleware');
const initSwagger = require('./swagger');
const router = require('./routes/index');
const user = require('./routes/user');

const app = express();

// 初始化mongo连接
MongoDB.initMongo();

// 初始化logger
Logger.initLogger();

// 初始化swagger
initSwagger(app);

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

// 中间件解析body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// 将返回结果统一封装返回
app.use(useResponse);

// 验证jwt
app.use(jwtAuth, (err, _, res, next) => {
	if (err) {
		Logger.logger.error({
			level: 'error',
			errInfo: err.stack
		});
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
// user 单独挂载
app.use('/', user);

// 自定义404返回
app.use((_, res) => {
	res.errorResponse(new Error('404 Not Found'), 404);
});

// 启动服务
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log('running at: http://localhost:8000');
	console.log('swagger at: http://localhost:8000/api-docs');
});
