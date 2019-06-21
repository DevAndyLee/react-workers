import React from 'react';
import { connect } from 'react-redux';

import * as actions from './reducer';
import AsyncComponent from '../AsyncComponent';

const Chart = AsyncComponent(() => import('../Chart/Chart'));

const Stream = (props) => {
    const {streaming, worker, setWorker, data} = props;

    const onAction = name => () => {
        props[name]();
    };

    return (
        <div>
            <h2>Stream</h2>

            <input value={worker} onChange={evt => setWorker(evt.target.value)} />

            <p>{streaming ? 'Currently streaming' : 'Not currently streaming'}</p>

            {streaming
                ? <button onClick={onAction('stop')}>Stop</button>
                : <button onClick={onAction('start')}>Start</button>
            }

            { data.length > 0 && <Chart data={data} /> }
        </div>
    );
};

export default connect(state => state.stream, actions)(Stream);
