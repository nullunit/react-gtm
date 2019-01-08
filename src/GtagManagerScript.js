import React from 'react';
import PropTypes from 'prop-types';
import GtagContext from './GtagContext';

export default class GtagManagerScript extends React.Component {

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

        //place the tag manager script in the page
        (
            function(w,d,s,l,i){
                w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
            }
        )(window,document,'script','dataLayer',this.props.id);
    }

    render() {
        return React.Children.only(this.props.children);    
    }
}
