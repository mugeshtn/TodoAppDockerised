import cors from 'cors'
import express from 'express';
import mongoose, { Mongoose } from 'mongoose';
import route from './route.js';

const app = express();

app.use(express.json())
app.use(cors())

app.use('/', route)

const CONNECTION_URL = "mongodb://localhost:27017/"
const URL_DOCKER = "mongodb://host.docker.internal:27017/"
const PORT = 5000

mongoose.connect(URL_DOCKER)
    .then(() => {
        console.log("Connected to mongodb!")
        app.listen(PORT, () => console.log(`Connected to server port http://localhost:${PORT}`))
    })
    .catch((err) => console.log(err.message))



