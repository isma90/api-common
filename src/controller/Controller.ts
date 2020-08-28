import * as express from "express";
import { IResponse } from "../interface";

export abstract class Controller {

    protected req: express.Request;
    protected res: express.Response;

    constructor(req: express.Request, res: express.Response) {
        this.req = req;
        this.res = res;
    }

    protected response(body: IResponse, code: number = 200): express.Response {
        return this.res.status(code).send({
            payload: { ...body.payload },
            status: { code, description: "", techCode: "", ...body.status },
        });
    }

}
