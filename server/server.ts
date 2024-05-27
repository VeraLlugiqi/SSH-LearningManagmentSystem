import { app } from "./app"
import {v2 as cloudinary} from 'cloudinary';
import connectDB from "./utils/db";
import  swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'
require("dotenv").config();

//cloudinary config
cloudinary.config({
cloud_name:process.env.CLOUD_NAME,
api_key:process.env.CLOUD_API_KEY,
api_secret:process.env.CLOUD_SECRET_KEY
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//create server
app.listen(process.env.PORT, () => {
    console.log(`Server is connected with port ${process.env.PORT}`)
    connectDB();
});

