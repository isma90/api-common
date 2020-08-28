import * as express from "express";
import { ObjectSchema } from "joi";

const OPTS = {
  abortEarly: false,
  language: {
    key: "{{key}} ",
  },
  stripUnknown: true,
};

export function schemaValidator(schema: ObjectSchema) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const params = req.method === "GET" ? req.params : req.body;
    const { error } = schema.validate(params, OPTS);
    if ( error ) {
      const { message } = error;
      return res.status(400).json({
        errors: [
          {
            status: 400,
            source: { pointer: req.path },
            title: "Error interno",
            detail: message,
          },
        ],
      });
    } else {
      return next();
    }
  };
}
