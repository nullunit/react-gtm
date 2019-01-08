import React from 'react';
import PropTypes from 'prop-types';
import GtagScript from './GtagScript';
import GtagManagerScript from './GtagManagerScript';
import { getGtagContext } from './GtagContext';

export default class GtagProvider extends React.Component {

    static defaultProps = {
        id: null,
        useTagManager: false,
        appName: null,
        appVersion: null
    };

    static propTypes = {
        id: PropTypes.string.isRequired,
        useTagManager: PropTypes.bool,
        appName: PropTypes.string,
        appVersion: PropTypes.string,
        children: PropTypes.node.isRequired
    };

    constructor(props) {
        super(props);
        this._createDataLayer();
    }

    _createDataLayer() {
        window.dataLayer = window.dataLayer || [];
    }

    _renderChild(context) {
        const child = React.Children.only(this.props.children);
        return React.cloneElement(child, { gtag: context }); 
    }
    
    render() {                                   
        const context = getGtagContext(window, this.props.id);
        context.appName = this.props.appName;
        context.appVersion = this.props.appVersion;
                                                                        
        if (this.props.useTagManager) { 
            return (<GtagManagerScript id={ this.props.id } context={ context }>{ this._renderChild(context) }</GtagManagerScript>);
        }
        else {                    
            return (<GtagScript id={ this.props.id } context={ context }>{ this._renderChild(context) }</GtagScript>);
        }
    }
}
