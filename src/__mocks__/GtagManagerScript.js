import React from 'react';

/**
 * Mock skips adding Google Tag Manager script to page as well as rendering child components.
 */
export default class GtagManagerScript extends React.Component {

    render() {
        return <h1>mock render Google Tag Manager script to page</h1>;
    }

}
