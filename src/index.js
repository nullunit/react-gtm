import { getGtagContext } from './GtagContext';
import React from 'react';

export { getGtagContext };
export { default as GtagProvider } from './GtagProvider';

export const withGtag = (WrappedComponent) => class extends React.Component {

    static displayName = 'GtaggedComponent';

    render() {
        return <WrappedComponent gtag={ getGtagContext(window) } { ...this.props } />;
    }

};
