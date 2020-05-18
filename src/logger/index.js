const fs = require('fs');
const path = require('path');
const winston = require('winston');
const moment = require('moment');


// // 设置log文件
// const logDirectory = path.join(__dirname, '../../log');
// // ensure log directory exists
// if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);

// const env = process.env.NODE_ENV;
// const logName = env === 'development'
// 	? 	`${moment().format('YYYY-MM-DD')}.log` : `${moment().format('YYYY-MM-DD HH:mm:ss')}.log`;

// // levels = {
// //     error: 0,
// //     warn: 1,
// //     info: 2,
// //     http: 3,
// //     verbose: 4,
// //     debug: 5,
// //     silly: 6
// //   };

// const logger = winston.createLogger({
// 	level: 'info',
// 	format: winston.format.json(),
// 	// 微服务 可用来区分服务名
// 	// defaultMeta: { service: 'user-service' },
// 	transports: [
// 		new winston.transports.File({ filename: path.join(logDirectory, logName), level: 'info' })
// 	]
// });

// //
// // If we're not in production then log to the `console` with the format:
// // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// //
// if (process.env.NODE_ENV !== 'production') {
// 	logger.add(new winston.transports.Console({ format: winston.format.simple() }));
// }

// levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6
//   };

class Logger {
	initLogger() {
		// 设置log文件
		const logDirectory = path.join(__dirname, '../../log');
		// ensure log directory exists
		if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);

		const env = process.env.NODE_ENV;
		const logName = env === 'development'
			? 	`${moment().format('YYYY-MM-DD')}.log` : `${moment().format('YYYY-MM-DD HH:mm:ss')}.log`;

		this.logger = winston.createLogger({
			level: 'info',
			format: winston.format.json(),
			// 微服务 可用来区分服务名
			// defaultMeta: { service: 'user-service' },
			transports: [
				new winston.transports.File({ filename: path.join(logDirectory, logName), level: 'info' })
			]
		});

		//
		// If we're not in production then log to the `console` with the format:
		// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
		//
		if (process.env.NODE_ENV !== 'production') {
			this.logger.add(new winston.transports.Console({ format: winston.format.simple() }));
		}
	}

	getLogger() {
		return this.logger;
	}
}

module.exports = new Logger();
