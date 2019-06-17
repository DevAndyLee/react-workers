import React, {Component} from 'react';
import {select} from 'd3-selection';

class D3Component extends Component {
    constructor(props) {
        super(props);
        this.root = React.createRef();
        this.component = props.component;
    }

    componentDidMount() {
        this.update(this.props);
    }

    componentDidUpdate(props) {
        this.update(props);
    }

    update(props) {
        select(this.root.current)
            .datum(this.props.data)
            .call(this.component);
    }

    render() {
        const {className} = this.props;
        return <div className={className} ref={this.root} />
    }
};

export default (className, component) => {
    return props => <D3Component className={className} component={component()} {...props} />;
};
