import React from 'react';

/**
 * Mock skips adding Google Analytics script to page as well as rendering child components.
 */
export default class GtagScript extends React.Component {

    render() {
        return <h1>mock render Google Analytics script to page</h1>;
    }

}
