import React, { lazy, Component, Suspense } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { isError: false, message: null };
    }

    static getDerivedStateFromError(error) {
        return {
            isError: true,
            message: error.message
        };
    }

    render() {
        const { isError, message } = this.state;
        const { children } = this.props;
        if (isError) {
            return <div className="error">Error: {message}</div>;
        }
        return children;
    }
};

export default loader => props => {
    const Component = lazy(loader);
    return <div>
        <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...props} />
            </Suspense>
        </ErrorBoundary>
    </div>;
};
