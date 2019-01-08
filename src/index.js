import React from 'react';
import { getGtagContext } from './GtagContext';

export { getGtagContext };
export { default as GtagProvider } from './GtagProvider';

export const withGtag = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            return <WrappedComponent gtag={ getGtagContext(window) } { ...this.props } />;
        }
    };
};
