import createWorkerMiddleware from './createWorkerMiddleware';
const CoinsListWorker = require('worker-loader?!../workers/CoinsListWorker');

const coinsListWorker = new CoinsListWorker();

const workerMiddleware = createWorkerMiddleware(
  coinsListWorker
);

export default workerMiddleware;
