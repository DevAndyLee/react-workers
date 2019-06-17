import '@babel/polyfill';

const workers = {};
workers['RandomData'] = () => import('./random-data');
workers['BackEnd'] = () => import('./back-end');

const workerInstances = {};

onmessage = async e => {
    const {name, type, content} = e.data;

    let instance = await getInstance(name);
    if (!instance) return;
    if (!instance[type]) {
        console.log('unknown message type', e.data);
        return;
    }
    instance[type](content);
};

const getInstance = async name => {
    if (workerInstances[name]) return workerInstances[name];

    const workerFn = workers[name];
    if (!workerFn) {
        console.log('unknown worker', name);
        return;
    }
   
    const Worker = (await workerFn()).default;
    const worker = {};
    new Worker({
        post: (type, content) => postMessage({ name, type, content }),
        on: (type, callback) => { worker[type] = callback; }
    });
    workerInstances[name] = worker;
    return worker;
};