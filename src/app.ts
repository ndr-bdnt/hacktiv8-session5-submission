import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs/promises'
import router from './routes/index.ts';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api',router)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});