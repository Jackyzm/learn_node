const Logger = require('../logger');

const useResponse = (req, res, next) => {
	res.successResponse = (...args) => {
		const [data] = args;

		Logger.logger.log({
			level: 'info',
			url: req.url,
			body: req.body,
			query: req.query,
			status: 200,
			res: data
		});

		if (!data) return res.status(200).send();

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

		Logger.logger.log({
			level: 'error',
			url: req.url,
			body: req.body,
			query: req.query,
			message: errObj.stack
		});
		return res.status(code).json(obj);
	};
	next();
};

module.exports = { useResponse };
