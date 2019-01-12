import PropTypes from 'prop-types';
import React from 'react';

export default class GtagManagerScript extends React.Component {

    static propTypes = {
        'children': PropTypes.node.isRequired,
        'id': PropTypes.string.isRequired
    };

    componentDidMount() {

        const { id } = this.props;

        //place the tag manager script in the page
        //(taken from Google Tag Manager console)
        (
            function(w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' });
                const [ f ] = d.getElementsByTagName(s);
                const j = d.createElement(s);
                const dl = l === 'dataLayer' ? '' : `&l=${l}`;
                j.async = true;
                j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
                f.parentNode.insertBefore(j, f);
            }(window, document, 'script', 'dataLayer', id));
    }

    render() {
        const { children } = this.props;
        return React.Children.only(children);
    }

}
