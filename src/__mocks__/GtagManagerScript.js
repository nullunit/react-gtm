import React from 'react';
import PropTypes from 'prop-types';
import GtagContext from '../GtagContext';

/**
 * Mock skips adding Google Tag Manager script to page as well as rendering child components.
 */
export default class GtagManagerScript extends React.Component {

    static defaultProps = {
        id: null,
        context: null
    };

    static propTypes = {
        id: PropTypes.string.isRequired,
        context: PropTypes.instanceOf(GtagContext).isRequired
    };

    render() {
        return (<h1>mock render Google Tag Manager script to page</h1>);
    }
}
