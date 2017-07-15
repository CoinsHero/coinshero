import createWorkerMiddleware from './createWorkerMiddleware';
const CoinsWorker = require('worker-loader?inline!../workers/CoinsWorker');

export default createWorkerMiddleware(new CoinsWorker());
