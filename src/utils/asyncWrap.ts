import { 
    Request as ExpressRequest, 
    Response as ExpressResponse, 
    NextFunction, 
} from 'express';

// Wraps async functions, catching all errors and sending them forward to express error handler
export default function asyncWrap(controller: CallableFunction) {
    return async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
        try {
           const abc = await controller(req, res, next);
            console.log("abc ", abc);
        } catch (e) {
            next(e);
        }
    };
}
