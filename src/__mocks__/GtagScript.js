import React from 'react';
import PropTypes from 'prop-types';
import GtagContext from '../GtagContext';

/**
 * Mock skips adding Google Analytics script to page as well as rendering child components.
 */
export default class GtagScript extends React.Component {

    static defaultProps = {
        id: null,
        context: null
    };

    static propTypes = {
        id: PropTypes.string.isRequired,
        context: PropTypes.instanceOf(GtagContext).isRequired
    };

    render() {
        return (<h1>mock render Google Analytics script to page</h1>);
    }
}
