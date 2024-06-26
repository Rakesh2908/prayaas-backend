// index.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import {dbConnection} from './database/dbConnection.js';
import  messageRouter from './router/messageRouter.js';
import checkoutRouter from './router/checkoutRouter.js';  // Adjusted import for default export

const app = express();

dotenv.config({ path: "./.env" });

const allowedOrigins = ['https://prayaas-zeta.vercel.app'];

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["POST"],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/message", messageRouter);
app.use("/api/v1", checkoutRouter);

dbConnection();

export default app;
