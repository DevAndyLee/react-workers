import React, {useState} from 'react';
import { connect } from 'react-redux';

import * as actions from './reducer';

const About = (props) => {
    const {reason, submitReason} = props;
    const [newReason, setNewReason] = useState(reason);

    return (
        <div>
            <h2>About</h2>
            <p>This page is not clicked on very often because:</p>
            <p>{reason}</p>

            <form onSubmit={evt => { submitReason(newReason); evt.preventDefault(); }}>
                <input value={newReason} onChange={evt => setNewReason(evt.target.value)} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default connect(state => state.about, actions)(About);
