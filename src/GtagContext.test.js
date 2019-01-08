import ArgumentError from './ArgumentError';
import GtagContext, { getGtagContext } from './GtagContext';

const GTM_ID = 'GTM-123456';

describe('GtagContext tests', () => {

    it('Creating GtagContext without window and GTM id', () => {
        expect(() => new GtagContext()).toThrow(ArgumentError);
        expect(() => new GtagContext({})).toThrow(ArgumentError);
    });

    it('Creating GtagContext with default values', () => {
        const w = {};
        const context = new GtagContext(w, GTM_ID);

        expect(context.id).toEqual(GTM_ID);
        expect(context.userId).toBeNull();
        expect(context.clientId).toBeNull();

        expect(context.dataLayer).toEqual([]);
        expect(context.dataLayer).toEqual(w.dataLayer);

        expect(context.toString()).toEqual(`Gtag{ ${GTM_ID} userId:<null>, clientId:<null> }`);
    });

    it('Creating GtagContext and set user id', () => {
        const w = {};
        const userId = '12345';
        const context = new GtagContext(w, GTM_ID);
        context.userId = null;

        //sanity check
        expect(context.userId).toBeNull();
        expect(w.dataLayer).toEqual([]);

        context.userId = userId;

        expect(context.id).toEqual(GTM_ID);
        expect(context.clientId).toBeNull();
        expect(context.userId).toEqual(userId);

        expect(w.dataLayer).toEqual([{ userId }]);
        expect(context.dataLayer).toEqual(w.dataLayer);

        expect(context.toString()).toEqual(`Gtag{ ${GTM_ID} userId:'${userId}', clientId:<null> }`);

        //setting again with the same value should not
        //append additional stuff to the data layer
        context.userId = userId;
        context.userId = userId;
        context.userId = userId;

        expect(w.dataLayer).toEqual([{ userId }]);
        expect(context.dataLayer).toEqual(w.dataLayer);

        //now set it to something new
        const newUserId = 'newId123';
        context.userId = newUserId;

        expect(context.userId).toEqual(newUserId);
        expect(w.dataLayer).toEqual([{ userId }, { 'userId': newUserId }]);
        expect(context.dataLayer).toEqual(w.dataLayer);

        expect(context.toString()).toEqual(`Gtag{ ${GTM_ID} userId:'${newUserId}', clientId:<null> }`);
    });

    it('Creating GtagContext and set client id', () => {
        const w = {};
        const clientId = '9999';
        const context = new GtagContext(w, GTM_ID);
        context.clientId = null;

        //sanity check
        expect(context.clientId).toBeNull();
        expect(w.dataLayer).toEqual([]);

        context.clientId = clientId;

        expect(context.id).toEqual(GTM_ID);
        expect(context.userId).toBeNull();
        expect(context.clientId).toEqual(clientId);

        expect(w.dataLayer).toEqual([{ "client_id": clientId }]);
        expect(context.dataLayer).toEqual(w.dataLayer);

        expect(context.toString()).toEqual(`Gtag{ ${GTM_ID} userId:<null>, clientId:'${clientId}' }`);

        //setting again with the same value should not
        //append additional stuff to the data layer
        context.clientId = clientId;
        context.clientId = clientId;
        context.clientId = clientId;

        expect(w.dataLayer).toEqual([{ "client_id": clientId }]);
        expect(context.dataLayer).toEqual(w.dataLayer);

        //now set it to something new
        const newClientId = 'newId123';
        context.clientId = newClientId;

        expect(context.clientId).toEqual(newClientId);
        expect(w.dataLayer).toEqual([{ "client_id": clientId }, { "client_id": newClientId }]);
        expect(context.dataLayer).toEqual(w.dataLayer);

        expect(context.toString()).toEqual(`Gtag{ ${GTM_ID} userId:<null>, clientId:'${newClientId}' }`);
    });

    it('Creating GtagContext and set app name', () => {
        const w = {};
        const appName = 'My App';
        const context = new GtagContext(w, GTM_ID);
        context.appName = null;

        //sanity check
        expect(context.appName).toBeNull();
        expect(w.dataLayer).toEqual([]);

        context.appName = appName;

        expect(context.id).toEqual(GTM_ID);
        expect(context.userId).toBeNull();
        expect(context.clientId).toBeNull();
        expect(context.appName).toEqual(appName);

        expect(w.dataLayer).toEqual([{ appName }]);
        expect(context.dataLayer).toEqual(w.dataLayer);

        //setting again with the same value should not
        //append additional stuff to the data layer
        context.appName = appName;
        context.appName = appName;
        context.appName = appName;

        expect(w.dataLayer).toEqual([{ appName }]);
        expect(context.dataLayer).toEqual(w.dataLayer);

        //now set it to something new
        const newAppName = 'My New App';
        context.appName = newAppName;

        expect(context.appName).toEqual(newAppName);
        expect(w.dataLayer).toEqual([{ appName }, { "appName": newAppName }]);
        expect(context.dataLayer).toEqual(w.dataLayer);
    });

    it('Creating GtagContext and set app version', () => {
        const w = {};
        const appVersion = '1.2.3';
        const context = new GtagContext(w, GTM_ID);
        context.appVersion = null;

        //sanity check
        expect(context.appVersion).toBeNull();
        expect(w.dataLayer).toEqual([]);

        context.appVersion = appVersion;

        expect(context.id).toEqual(GTM_ID);
        expect(context.userId).toBeNull();
        expect(context.clientId).toBeNull();
        expect(context.appVersion).toEqual(appVersion);

        expect(w.dataLayer).toEqual([{ appVersion }]);
        expect(context.dataLayer).toEqual(w.dataLayer);

        //setting again with the same value should not
        //append additional stuff to the data layer
        context.appVersion = appVersion;
        context.appVersion = appVersion;
        context.appVersion = appVersion;

        expect(w.dataLayer).toEqual([{ appVersion }]);
        expect(context.dataLayer).toEqual(w.dataLayer);

        //now set it to something new
        const newAppVersion = '1.2.4';
        context.appVersion = newAppVersion;

        expect(context.appVersion).toEqual(newAppVersion);
        expect(w.dataLayer).toEqual([{ appVersion }, { "appVersion": newAppVersion }]);
        expect(context.dataLayer).toEqual(w.dataLayer);
    });

    it('Publish GtagContext event', () => {
        const w = {};
        const eventName = 'MyEvent';
        const context = new GtagContext(w, GTM_ID);
        context.event(eventName);

        expect(w.dataLayer).toEqual([{ 'event': eventName }]);
        expect(context.dataLayer).toEqual(w.dataLayer);
    });

    it('Publish GtagContext event with parameters', () => {
        const w = {};
        const eventName = 'MyEvent';
        const params = {
            'param1': 'param1 value',
            'param 2': 2,
            'param3': true
        };
        const context = new GtagContext(w, GTM_ID);
        context.event(eventName, params);

        expect(w.dataLayer).toEqual([{ 'event': eventName, ...params }]);
        expect(context.dataLayer).toEqual(w.dataLayer);
    });

    it('Call gtag on GtagContext', () => {
        const w = {};
        const date = new Date();
        const id = 'U-12345';
        const context = new GtagContext(w, GTM_ID);
        context.gtag('js', date);
        context.gtag('config', id);

        expect(w.dataLayer.length).toBe(2);
        const js = w.dataLayer[0];
        expect(js[0]).toEqual('js');
        expect(js[1]).toEqual(date);

        const config = w.dataLayer[1];
        expect(config[0]).toEqual('config');
        expect(config[1]).toEqual(id);

        expect(context.dataLayer).toEqual(w.dataLayer);
    });
});

describe('getGtagContext tests', () => {

    it('Call getGtagContext first time without window and id', () => {
        const w = {};

        expect(() => getGtagContext()).toThrow(ArgumentError);
        expect(() => getGtagContext(w)).toThrow(ArgumentError);
    });

    it('Call getGtagContext with window and ID', () => {
        const w = {};
        const context = getGtagContext(w, GTM_ID);

        expect(context.id).toEqual(GTM_ID);
        expect(context.userId).toBeNull();
        expect(context.clientId).toBeNull();

        expect(context.dataLayer).toEqual([]);
        expect(context.dataLayer).toEqual(w.dataLayer);

        expect(context.toString()).toEqual(`Gtag{ ${GTM_ID} userId:<null>, clientId:<null> }`);
    });

    it('Call getGtagContext after first time without window and id', () => {
        const w = {};
        const context = getGtagContext(w, GTM_ID);

        expect(context).toBe(getGtagContext());
        expect(context).toBe(getGtagContext(w));
    });
});
