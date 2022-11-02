import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'
import morgan from 'morgan'; 
import {dirname} from 'path'
import { fileURLToPath } from 'url';
import path from 'path'
import helmet from 'helmet';
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize' 


const _dirname = dirname(fileURLToPath(import.meta.url))

// import cors from 'cors'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
const app = express();
app.use(express.static(path.resolve(_dirname,'./client/build')))
dotenv.config();

import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRouter.js'

import notFoundMiddleware from './middleware/notFoundMiddleware.js';
import connectDB from './db/connect.js';
import authenticateUser from './middleware/auth.js';
app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
// app.use(cors())

if(process.env.NODE_ENV!=='production'){
    app.use(morgan('dev'))
}

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticateUser,jobsRouter)

app.get('*',function(request,response){
    response.sendFile(path.resolve(_dirname,'./client/build','index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware);
const PORT = process.env.PORT || 5000

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT,()=>{
            console.log(`Server is listening on port ${PORT}`);
        })
    }
    catch(error){
        console.log(error);
    }
}

start()