import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { attachApollo } from './apollo/server';

env.config(); //take this out to a script arg
console.log(process.env.PORT);
console.log(process.env.NODE_ENV);
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// cord for development
app.use(cors());

// logging
app.use(morgan('dev'));

// apollo
attachApollo(app);

// mongo
const DB_HOST = process.env.DB_HOST || '0.0.0.0';
const DB_PORT = process.env.DB_PORT || 27017;

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/stockopedia`, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console.error, 'MongoDB connection error: '));
db.once('open', () => {
  console.log('Connected to MongoDB');

  app.get('/', (req, res) => res.send('Express + TypeScript Server'));

  app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://${HOST}:${PORT}`);
  });
});
