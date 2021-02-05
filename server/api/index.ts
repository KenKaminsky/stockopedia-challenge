import express from 'express';
import plans from './routes/plans';

const router = express.Router();

plans(router);

export default router;
