import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { Error } from 'mongoose';
import morgan from 'morgan';
import api from './api';

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('./api', api);
app.use(express.static('statis'));

app.use(morgan('dev'));

app.use((req, res) => {
  const err = new Error('Not Found');
  // err.status = 404;
  res.json(err);
});

app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://${HOST}:${PORT}`);
});
