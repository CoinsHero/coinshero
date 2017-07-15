import createWorkerMiddleware from './createWorkerMiddleware';
const CoinsWorker = require('worker-loader?!../workers/CoinsWorker');

export default createWorkerMiddleware(new CoinsWorker());
