import ArgumentError from './ArgumentError';

/**
 * {@link GtagContext} global site tag context singleton.
 * @type {GtagContext}
 */
let GTAG_CONTEXT = null;

/**
 * The Google global site tag context, allowing access to push events
 * to <a href="https://support.google.com/analytics/answer/1008015?hl=en">Google Analytics</a>
 * and/or <a href="https://support.google.com/tagmanager/answer/6102821?hl=en">Google Tag manager</a>.
 */
export default class GtagContext {

    constructor(window, id) {

        if (window == null) {
            throw new ArgumentError('GtagContext could not be created, required parameter \'window\' cannot be null');
        }

        if (id == null) {
            throw new ArgumentError('GtagContext could not be created, required parameter \'id\' cannot be null');
        }

        this._window = window;
        this._id = id;
        this._userId = null;
        this._clientId = null;
        this._appName = null;
        this._appVersion = null;
        this._dataLayer = this._window.dataLayer || [];
        this._window.dataLayer = this._dataLayer;
    }

    get dataLayer() {
        return this._dataLayer;
    }

    get id() {
        return this._id;
    }

    get appName() {
        return this._appName;
    }

    set appName(value) {

        if (this._appName === value) {
            return;
        }

        this._appName = value;
        this.push({ 'appName': value });
    }

    get appVersion() {
        return this._appVersion;
    }

    set appVersion(value) {

        if (this._appVersion === value) {
            return;
        }

        this._appVersion = value;
        this.push({ 'appVersion': value });
    }

    get clientId() {
        return this._clientId;
    }

    set clientId(value) {

        if (this._clientId === value) {
            return;
        }

        this._clientId = value;
        this.push({ 'client_id': value });
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {

        if (this._userId === value) {
            return;
        }

        this._userId = value;
        this.push({ 'userId': value });
    }

    gtag() {
        this.push(arguments);
    }

    event(event, params) {
        this.push({ event, ...params });
    }

    push() {
        this._dataLayer.push(...arguments);
    }

    toString() {
        const id = this.id ? `${this.id} ` : '';
        const userId = this.userId ? `'${this.userId}'` : '<null>';
        const clientId = this.clientId ? `'${this.clientId}'` : '<null>';

        return `Gtag{ ${id}userId:${userId}, clientId:${clientId} }`;
    }

}

/**
 * Get or create the Google {@link GtagContext}
 * @param {Window} window Required for first call to this function, the javascript window object.
 * @param {String} id Required for first call to this function, the Google Analytics or Tag Manager ID.
 * @returns {GtagContext} Returns the Google Tag Manager context.
 */
export const getGtagContext = (...args) => {

    if (GTAG_CONTEXT == null) {
        const [ w, id ] = args;
        GTAG_CONTEXT = new GtagContext(w || window, id);
    }

    return GTAG_CONTEXT;
};
