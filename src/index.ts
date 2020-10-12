import {
    Application,
    NextFunction,
    Request,
    Response
} from '@types/express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { mongoDB } from './db';
import { jwtAuth } from './jwt';
import { initLogger } from './logger';
import { useResponse } from './middleware';
import * as router from './routes';
import user from './routes/user';
import { initSwagger } from './swagger';

const app: Application = express();

// 初始化mongo连接
mongoDB.initMongo();

// 初始化logger
initLogger();

// 初始化swagger
initSwagger(app);

// allow custom header and CORS 跨域解决
// app.all('*', (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Content-Type, Content-Length, Authorization, Accept, X-Requested-With',
//     );
//     res.header(
//         'Access-Control-Allow-Methods',
//         'PUT, POST, GET, DELETE, OPTIONS',
//     );

//     if (req.method === 'OPTIONS') {
//         res.send(200);
//     } else {
//         next();
//     }
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
app.use(jwtAuth, (err: Error, _: Request, res: Response, next: NextFunction): void => {
    if (err) {
        Logger.logger.error({
            level: 'error',
            errInfo: err.stack
        });

        return res.status(401)
            .json({
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
app.use((_: Request, res: Response): void => {
    res.errorResponse(new Error('404 Not Found'), 404);
});

// 启动服务
const PORT: number = Number(process.env.PORT) || 8000;
app.listen(PORT, (): void => {
    console.log('running at: http://localhost:8000');
    console.log('swagger at: http://localhost:8000/api-docs');
});
