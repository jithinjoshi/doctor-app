import * as dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import { database } from './Database/connection.js';
import userRouter from './router/user.js';
import adminRouter from './router/admin.js';
import doctorRouter from './router/doctor.js'


const PORT = process.env.PORT;
const app = express();

//database
database();

//middlewares
app.use(cors({ origin: true, credentials: true, origin: "http://localhost:3000" }));
app.use(express.json({ limit: '50mb' }));
app.use(morgan('combined'));
app.use(cookieParser())
app.use(express.urlencoded({
    extended: true
}));

app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);



app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));