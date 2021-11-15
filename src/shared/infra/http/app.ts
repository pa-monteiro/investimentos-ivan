import express, { Request, Response, NextFunction} from 'express';
import "express-async-errors"
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import swaggerFile from '../../../swagger.json'


import createConnection from "@shared/infra/typeorm"
import "@shared/container"
import { router } from '@shared/infra/http/routes';
import { AppError } from '@shared/errors/AppError';

const app = express();

app.use(express.json());

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000', 'https://horizont-invest.herokuapp.com'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options))
app.use("/docs",swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
createConnection().then(() => console.log('connection with database successfull')).catch(error => console.log(error));

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
})

export {
    app
}