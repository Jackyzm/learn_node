import {
    NextFunction, Request, Response
} from '@types/express';
import * as Logger from '../logger';

const useResponse = (req, res: Response, next: NextFunction): Response => {
    res.successResponse = (data: any): void => {
        Logger.logger.log({
            level: 'info',
            url: req.url,
            body: req.body,
            query: req.query,
            status: 200,
            res: data
        });

        if (!data) {
            return res.status(200)
                .send();
        }

        return res.status(200)
            .json({
                code: 200,
                data,
                success: true
            });
    };

    res.errorResponse = (err: Error, status?: number, message?: string): void => {
        let code = 500;

        let msg: string = (err && err.message) || '未知错误';

        // 通过new Error 自己创建的 可预知的错误
        if (err.name === 'Error') { code = 400; }
        if (status) { code = status; }
        if (message) { msg = message; }

        const obj: Object = {
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

        return res.status(code)
            .json(obj);
    };
    next();
};

export { useResponse };
