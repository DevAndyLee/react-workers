import {injectReducer} from '../store';
import WorkerClient from '../worker-client';

const actions = {
    SET_WORKER: 'stream/SET_WORKER',
    START: 'stream/START',
    STOP: 'stream/STOP',
    APPEND_DATA: 'stream/APPEND_DATA'
};

const defaultState = {
    streaming: false,
    worker: 'BackEnd',
    data: []
};

export default injectReducer('stream', (state = defaultState, action = null) => {
    switch (action.type) {
        case actions.SET_WORKER:
            return Object.assign({}, state, { worker: action.worker });
        case actions.START:
            return Object.assign({}, state, { streaming: true });
        case actions.STOP:
            return Object.assign({}, state, { streaming: false });
        case actions.APPEND_DATA:
            return Object.assign({}, state, { data: state.data.concat(action.data) });
        default:
            return state;
    }
});

export const setWorker = (worker) => {
    return {
        type: actions.SET_WORKER,
        worker
    };
};

let streamSource;
export const start = () => {
    return (dispatch, getState) => {
        dispatch({
            type: actions.START
        });

        const workerName = getState().stream.worker;

        streamSource = new WorkerClient(workerName);
        streamSource.on('data', d => dispatch(appendData(d)))
        streamSource.post('start');
    };
};

export const stop = () => {
    if (streamSource) {
        streamSource.post('stop');
    }

    return {
        type: actions.STOP
    };
};

const appendData = (data) => {
    return {
        type: actions.APPEND_DATA,
        data
    };
};
