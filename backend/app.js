
import express from 'express';
import cors from 'cors';
import usersRouter from './routes/usersRoutes.js';
import { handlingError, notFoundHandler } from './middlewares/errorMiddleware.js';

export function createApp() {
    const app = express();

    app.use(cors());
    
    app.use(express.json());

    app.get('/', (_req, res) => {
        res.json({
        message: 'API de usuarios - Ejercicio 2',
        version: '2.0',
        architecture: 'Routes → Repository + Model'
        });
    });

    app.use('/api/users', usersRouter);
    app.use(handlingError);
    app.use(notFoundHandler);
    return app;
}
