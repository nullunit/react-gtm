import GtagContext from './GtagContext';
import PropTypes from 'prop-types';
import React from 'react';

export default class GtagScript extends React.Component {

    static propTypes = {
        'children': PropTypes.node.isRequired,
        'context': PropTypes.instanceOf(GtagContext).isRequired,
        'id': PropTypes.string.isRequired
    };

    componentDidMount() {

        const { id } = this.props;
        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;

        const [ firstScript ] = document.getElementsByTagName('script');
        firstScript.parentNode.insertBefore(gtagScript, firstScript);

        const { context } = this.props;
        context.gtag('js', new Date());
        context.gtag('config', id);
    }

    render() {
        const { children } = this.props;
        return React.Children.only(children);
    }

}
