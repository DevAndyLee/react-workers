const WEB_WORKER_PATH = 'web-worker.js';

let worker = null;

export default class WorkerClient {
    constructor(name) {
        this.name = name;

        if (!worker) {
            worker = new Worker(`${process.env.PUBLIC_URL}/${WEB_WORKER_PATH}`);
        }

        this.callbacks = {};
        worker.onmessage = e => {
            const { type, content } = e.data;

            const callback = this.callbacks[type];
            if (!callback) {
                console.log('Unknown message', e.data);
            }

            callback(content);
        };
    }

    post(type, content) {
        worker.postMessage({ name: this.name, type, content });
    }

    on(type, callback) {
        this.callbacks[type] = callback;
    }
};
