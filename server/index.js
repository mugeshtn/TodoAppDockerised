import cors from 'cors'
import express from 'express';
import mongoose, { Mongoose } from 'mongoose';
import route from './route.js';

const app = express();

app.use(express.json())
app.use(cors())

app.use('/', route)

const CONNECTION_URL = "mongodb://localhost:27017/"

mongoose.connect(CONNECTION_URL)
    .then(() => {
        console.log("Connected to mongodb!")
        app.listen(5000, () => console.log('Connected to server port http://localhost:5000'))
    })
    .catch((err) => console.log(err.message))



