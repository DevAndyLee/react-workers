import React from 'react';
import { connect } from 'react-redux';

import * as actions from './reducer';

const Home = props => {
    const { clickCount, clickButton } = props;
    return (
        <div>
            <h2>Home</h2>
            <p>
                I have been clicked {clickCount} times
            </p>
            <button onClick={clickButton}>Click Me</button>
        </div>
    );
};

export default connect(state => state.home, actions)(Home);
