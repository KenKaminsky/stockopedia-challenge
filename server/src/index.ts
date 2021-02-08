import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { attachApollo } from './apollo/server';
import { plans } from './mock_data/seed.json';
import Plan from './models/plan';

env.config(); //take this out to a script arg
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const app = express();

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
db.once('open', async () => {
  console.log('Connected to MongoDB');

  const plansCount = await Plan.countDocuments({});
  if (plansCount === 0) await Plan.insertMany(plans);

  app.get('/', (req, res) => res.send('Access the API at /graphql'));

  app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://${HOST}:${PORT}`);
  });
});
