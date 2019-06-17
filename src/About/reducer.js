import {injectReducer} from '../store';

const actions = {
    SUBMIT_REASON: 'about/SUBMIT_REASON'
};

const defaultState = {
    reason: 'I don\'t know why'
};

export default injectReducer('about', (state = defaultState, action = null) => {
    switch (action.type) {
        case actions.SUBMIT_REASON:
            return Object.assign({}, state, { reason: action.reason });
        default:
            return state;
    }
});

export const submitReason = (reason) => {
    return {
        type: actions.SUBMIT_REASON,
        reason
    };
};
