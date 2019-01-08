import React from 'react';
import PropTypes from 'prop-types';
import GtagContext from './GtagContext';

export default class GtagScript extends React.Component {

    static defaultProps = {
        id: null,
        context: null
    };

    static propTypes = {
        id: PropTypes.string.isRequired,
        context: PropTypes.instanceOf(GtagContext).isRequired,
        children: PropTypes.node.isRequired
    };

    componentDidMount() {

        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${this.props.id}`;
        
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(gtagScript, firstScript);

        const { context } = this.props;
        context.gtag('js', new Date());
        context.gtag('config', this.props.id);
    }
    
    render() {
        return React.Children.only(this.props.children);
    }
}
