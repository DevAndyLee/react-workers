import {injectReducer} from '../store';

const actions = {
    CLICK_BUTTON: 'home/CLICK_BUTTON'
};

const defaultState = {
    clickCount: 0
};

export default injectReducer('home', (state = defaultState, action = null) => {
    switch (action.type) {
        case actions.CLICK_BUTTON:
            return Object.assign({}, state, { clickCount: state.clickCount + 1 });
        default:
            return state;
    }
});

export const clickButton = () => {
    return {
        type: actions.CLICK_BUTTON
    };
};
