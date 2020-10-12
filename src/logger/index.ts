import fs from 'fs';
import moment from 'moment';
import path from 'path';
import winston from 'winston';

// // 设置log文件
// const logDirectory = path.join(__dirname, '../../log');
// // ensure log directory exists
// if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);

// const env = process.env.NODE_ENV;
// const logName = env === 'development'
//     ? `${moment().format('YYYY-MM-DD')}.log` : `${moment().format('YYYY-MM-DD HH:mm:ss')}.log`;

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
//     level: 'info',
//     format: winston.format.json(),
//     // 微服务 可用来区分服务名
//     // defaultMeta: { service: 'user-service' },
//     transports: [
//         new winston.transports.File({ filename: path.join(logDirectory, logName), level: 'info' }),
//     ],
// });

// //
// // If we're not in production then log to the `console` with the format:
// // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// //
// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({ format: winston.format.simple() }));
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

/**
 * Mongo Class
 * @description Logger
 */
class Logger {
    public initLogger(): void {
        // 设置log文件
        const logDirectory: string = path.join(__dirname, '../../log');
        // ensure log directory exists
        if (!fs.existsSync(logDirectory)) { fs.mkdirSync(logDirectory); }

        const env: string = process.env.NODE_ENV;
        const logName: string = env === 'development'
            ? `${moment().format('YYYY-MM-DD')}.log` : `${moment().format('YYYY-MM-DD HH:mm:ss')}.log`;

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

    public getLogger(): void {
        return this.logger;
    }
}

module.exports = new Logger();
