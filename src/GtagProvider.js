import { getGtagContext } from './GtagContext';
import GtagManagerScript from './GtagManagerScript';
import GtagScript from './GtagScript';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * The Google Tag Manager provider React component.
 *
 * @class GtagProvider
 * @author Justin Smith <justin@nullunit.co>
 * @example
 * const GTM_ID = 'GTM-12345';
 * const MY_APP_NAME = 'My great app'; //Optional
 * const MY_APP_VERSION = '3.1.2'; //Optional
 *
 * ...
 *
 * <GtagProvider id={ GTM_ID } appName={ MY_APP_NAME } appVersion={ MY_APP_VERSION } useTagManager={ true }>
 *     <BrowserRouter>
 *         <App />
 *     </BrowserRouter>
 * </GtagProvider>
 *
 *
 *
 *
 */
export default class GtagProvider extends React.Component {

    static defaultProps = {
        'appName': null,
        'appVersion': null,
        'useTagManager': false
    };

    static propTypes = {
        'appName': PropTypes.string,
        'appVersion': PropTypes.string,
        'children': PropTypes.node.isRequired,
        'id': PropTypes.string.isRequired,
        'useTagManager': PropTypes.bool
    };

    constructor(props) {
        super(props);
        this._createDataLayer();
    }

    _createDataLayer() {
        window.dataLayer = window.dataLayer || [];
    }

    _renderChild(context) {
        const { children } = this.props;
        const child = React.Children.only(children);
        return React.cloneElement(child, { 'gtag': context });
    }

    _renderTagManagerScript(id, context) {
        return (
            <GtagManagerScript context={ context } id={ id }>
                { this._renderChild(context) }
            </GtagManagerScript>
        );
    }

    _renderGtagScript(id, context) {
        return (
            <GtagScript context={ context } id={ id }>
                { this._renderChild(context) }
            </GtagScript>
        );
    }

    render() {

        const { id, appName, appVersion, useTagManager } = this.props;
        const context = getGtagContext(window, id);
        context.appName = appName;
        context.appVersion = appVersion;

        if (useTagManager) {
            return this._renderTagManagerScript(id, context);
        }

        return this._renderGtagScript(id, context);
    }

}
